// eslint-disable-next-line no-unused-vars
import React from "react";
import InputWithLabel from "./InputWithLabel";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminButton from "./AdminButton";
import VenueDataService from "../services/VenueDataService";
import { useParams } from "react-router-dom";
import VenueReducer from "../services/VenueReducer";
import { useNavigate } from "react-router-dom";



const UpdateVenue=()=>{
  const { id } = useParams();
   const navigate=useNavigate();
  const location=useLocation();
 const [venue,dispatchVenues]=React.useReducer(VenueReducer,{
  data:{},
  isSuccess: false,
 })
  const [inputData, setInputData] = useState({
    name: location.state.name,
    address: location.state.adress,
    foodanddrink: location.state.foodanddrink,
    lat:location.state.Enlem,
    long:location.state.Boylam,
    day1:location.state.Gunler1,
    ope1:location.state.acilic1,
    close1:location.state.kapanis1,
    days2:location.state.Gunler2,
    open2:location.state.acilic2,
    close2:location.state.kapanis2
  });
const handleInputChange=(evt)=>{
  setInputData((prevData) => ({ ...prevData, [evt.target.name]: evt.target.value }));
}  

const onClick=(evt)=>{
  evt.preventDefault();
  console.log(inputData);

 
 try{

  VenueDataService.updateVenue(id,inputData).then(()=>{
    dispatchVenues({type:"ADD_VENUE_SUCCESS"});
  });}
  catch(error){
    dispatchVenues({type:"ADD_VENUE_FAILURE"});
    console.log("ERROR :",error);
  }
  
}


if (venue.isSuccess){
  return navigate("/admin/");
}

    return(<div>
     <form
              className="form-horizontal"
              method="put"
              onSubmit={(evt) => onClick(evt)}
            >
    <h1>{location.state.name} Mekanını Güncell</h1>
   
    <InputWithLabel
            id="add-field"
        label="Mekan Adi:"
        type="text"
        placeholder={location.state.name}
        name="name"
        onInputChange={handleInputChange}
          />
          <br/>
          <InputWithLabel
              id="add-field"
        label="Mekan Adresi:"
        type="text"
        placeholder={location.state.adress}
        name="address"
        onInputChange={handleInputChange}
          />
          <br/>
          <InputWithLabel
              id="add-field"
        label="imkanlar"
        type="text"
        placeholder={location.state.foodanddrink}
        name="foodanddrink"
        onInputChange={handleInputChange}
          />
          <br/>
          <InputWithLabel
              id="add-field"
        label="Enlem"
        type="text"
        placeholder={location.state.Enlem}
        name="Enlem"
        onInputChange={handleInputChange}
          />
          <br/>
          <InputWithLabel
             id="add-field"
        label="Boylam"
        type="text"
        placeholder={location.state.Boylam}
        name="Boylam"
        onInputChange={handleInputChange}
          />
          <br/>
          <InputWithLabel
              id="add-field"
        label="Günler-1:"
        type="text"
        placeholder={location.state.Gunler1}
        name="Gunler1"
        onInputChange={handleInputChange}
          />
          <br/>
          <InputWithLabel
          id="add-field"
             label="Açılış-1-1:"
        type="text"
        placeholder={location.state.acilic1}
        name="acilic1"
        onInputChange={handleInputChange}
          />
          <br/>
          <InputWithLabel
          id="add-field"
             label="Kapanış-1:"
        type="text"
        placeholder={location.state.kapanis1}
        name="kapanis1"
        onInputChange={handleInputChange}
          />

          <br/>
      
          <br/>
          <InputWithLabel
          id="add-field"
             label="Günler-2:"
        type="text"
        placeholder={location.state.Gunler2}
        name="Gunler2"
        onInputChange={handleInputChange}
          />

          <br/>
          <InputWithLabel
              id="add-field"
             label="Açılış-2:"
        type="text"
        placeholder={location.state.acilic2}
        name="acilic2"
        onInputChange={handleInputChange}
          />
          
          <br/>
          <InputWithLabel
              id="add-field"
             label="Kapanış-2:"
        type="text"
        name="kapanis2"
        
        placeholder={location.state.kapanis2}
        onInputChange={handleInputChange}
          />
          
          <br/>
       
           <button className="btn btn-primary pull-right" onSubmit={onClick}>Guncell</button>
    
          {/* <AdminButton type="primary" name="Guncell" onClick={onClick}/> */}

</form>


    </div>);
}

export default UpdateVenue;