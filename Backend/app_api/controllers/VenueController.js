var mongoose = require("mongoose");
const { param } = require("../routes");
var Venue = mongoose.model("venue");




const createResponse=function(res,status,content){
    res.status(status).json(content);
}
const listAllVenues= async function(req,res){
    await Venue.find().exec().then((venues) => {
        try {
          createResponse(res, 200, venues);
        } catch (error) {
          createResponse(res, 404, { status: "Mekanlar bulunamadı..." });
        }
      });
}



const nearbyVenues=async function(req,res){
    var lat=parseFloat(req.query.lat);
    var long =parseFloat(req.query.long);


    var point={
        type:"Point",
        coordinates:[lat,long]
    };

    var geoOptions={
        distanceField:"dis",
        spherical:true,
    };
    try{
        const result =await Venue.aggregate([
            {
                $geoNear:{
                    near:point,
                    ...geoOptions,
                },
            },
        ]);
        const venues=result.map((venue)=>{
            return{
                distance:converter.kilometer2Radian(venue.dis),
                name:venue.name,
                address:venue.address,
                rating:venue.rating,
                foodanddrink:venue.foodanddrink,
                id:venue._id,
              
             };
        });
        createResponse(res,200,venues);
}
catch(e){
    console.log(e);
    createResponse(res,404,{
        status:"Enlem ve boylam zorunlu ve sıfırdan farklı olmalı "
    });
}
};


var converter=(function(){
    var earthRadius=6371; //km
    var radian2Kilometer=function(radian){
        return parseFloat(radian * earthRadius);
    };
    var kilometer2Radian=function(distance){
        return parseFloat(distance/earthRadius);
    };
    return{

        radian2Kilometer,kilometer2Radian,
    };
})();




const addVenue= async function(req,res){
    try{

        
        await Venue.create({
            
            ...req.body,
            coordinates: [req.body.lat,req.body.long],
            hours:[
                {
                    days: req.body.day1,
                    open:req.body.open1,
                    close:req.body.close1,
                    isClosed:req.body.isClosed1,
                },
                {
                    days: req.body.day2,
                    open:req.body.open2,
                    close:req.body.close2,
                    isClosed:req.body.isClosed2,

                },
                
            ],
        })
        .then(function(response){
            createResponse(res,201,response)
        });
   
    }
    catch(error){

        createResponse(res,400,{status:"Ekleme başarsiz"})

    }
  
}


const getVenue = async function (req, res) {
    try {
      await Venue.findById(req.params.venueid)
        .exec().then( function(venue){
            console.log("venue: ",venue);
            createResponse(res,"200",venue);

        });     
    } catch (error) {
      createResponse(res, 404, { status: "Böyle bir mekan yok", error });
    }
  };





const updateVenue=async function(req,res){
    try{
        await Venue.findByIdAndUpdate(req.params.venueid,
            {
                ...req.body,
                coordinates:[req.body.lat,req.body.long],
                hours:[
                    {
                        days:req.body.day1,
                        open:req.body.open1,
                        close:req.body.close1,
                        isClosed:req.body.isClosed1,
                    },
                    {
                        
                        days:req.body.day2,
                        open:req.body.open2,
                        close:req.body.close2,
                        isClosed:req.body.isClosed2,
                    },

                ],
            }).then(function(updateVenue){
                
                createResponse(res,200,updateVenue);
            });
    }catch(error){
        console.log("error :",error);
        createResponse(res,400,{status:"Güncelleme başarsız"})
    }
}  

const deleteVenue= async function(req,res){
    try{
        await Venue.findByIdAndDelete(req.params.venueid).then(function(venue){
            createResponse(res,200,{status:venue.name+" isimli mekan Slindi"});
        });

    }catch(error){
        createResponse(res,404,{status:"Böyle bir mekan yok!"});


    }

}







module.exports={
   listAllVenues,
 addVenue,
 getVenue,
updateVenue,
deleteVenue,
nearbyVenues,
   
   
};



