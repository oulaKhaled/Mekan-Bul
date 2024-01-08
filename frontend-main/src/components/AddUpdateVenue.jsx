import React from "react";
import VenueReducer from "../services/VenueReducer";
import VenueDataService from "../services/VenueDataService";

import { useNavigate } from "react-router-dom";



function AddUpdateVenue() {
  var navigate=useNavigate();
  
  // eslint-disable-next-line no-unused-vars
  const [venue,dispatchVenues]=React.useReducer(VenueReducer,{
    data:{},
    isSuccess:false
  });
 

const onSubmit=(evt)=>{
        evt.preventDefault();
if(evt.target.name.value&&
  evt.target.address.value&&
  evt.target.foodanddrink.value&&
  evt.target.Enlem.value&&
  evt.target.Boylam.value&&
  evt.target.Gunler1.value&&
  evt.target.acilic1.value&&
  evt.target.kapanis1.value&&
  evt.target.Gunler2.value&&
  evt.target.acilic2.value&&
  evt.target.kapanis2.value
  ){
        const newVenues={
        name:evt.target.name.value,
        address:evt.target.address.value,
        foodanddrink:evt.target.foodanddrink.value,
        lat :evt.target.Enlem.value,
        long :evt.target.Boylam.value,
        day1:evt.target.Gunler1.value,
        open1:evt.target.acilic1.value,
        close1:evt.target.kapanis1.value, 
        day2:evt.target.Gunler2.value,
        open2:evt.target.acilic2.value,
        close2:evt.target.kapanis2.value,
       };
       console.log(newVenues);
      VenueDataService.addVenue(newVenues).then(()=>{
        dispatchVenues({type:"ADD_VENUE_SUCCESS"});
      });
    
       }
     else{
            dispatchVenues({type:"ADD_VENUE_FAILURE"});     
      }
    };
    if(venue.isSuccess){
      return navigate("/admin/");
    }
  return (
      <div>
          <h1>Yeni Mekan ekle </h1>
          <form
              className="form-horizontal"
              onSubmit={(evt) => onSubmit(evt)}
              method="post"
            >
           
              <label className="col-xs-10 col-sm-2 control-label">
                  Mekan Ad:
                </label>
          <input
              id="add-field"
        label="Mekan Adi:"
        type="text"
        name="name"
          />
          
          <br/>


        
          <label className="col-xs-10 col-sm-2 control-label">
          Address:
                </label>
          <input
              id="add-field"
        label="Mekan Adresi:"
        type="text"
        name="address"
          />
           
          <br/>

        
          <label className="col-xs-10 col-sm-2 control-label">imkanlar:</label>
          <input
              id="add-field"
        label="imkanlar"
        type="text"
        name="foodanddrink"
          />
           
          <br/>

        
          <label className="col-xs-10 col-sm-2 control-label">
          Enlem:
                </label>
          <input
              id="add-field"
        label="Enlem"
        type="text"
        name="Enlem"
          />
           
          <br/>
        
          <label className="col-xs-10 col-sm-2 control-label">
          Boylam:
                </label>
          <input
             id="add-field"
        label="Boylam"
        type="text"
        name="Boylam"
          />
           
          <br/>
        
          <label className="col-xs-10 col-sm-2 control-label">
          Gunler1:
                </label>
          <input
              id="add-field"
        label="Günler-1:"
        type="text"
        name="Gunler1"
          />
           
          <br/>
        
          <label className="col-xs-10 col-sm-2 control-label">
          Açılış-1:
                </label>
          <input
          id="add-field"
             label="Açılış-1-1:"
        type="text"
        name="acilic1"
          />
           
          <br/>
        
          <label className="col-xs-10 col-sm-2 control-label">
          Kapanış1:
                </label>
          <input
          id="add-field"
             label="Kapanış-1:"
        type="text"
        name="kapanis1"
          />
        
          <br/>
        
          <label className="col-xs-10 col-sm-2 control-label">
         Gunler2:
                </label>
          <input
          id="add-field"
             label="Günler-2:"
        type="text"
        name="Gunler2"
          />
           
          <br/>
        
          <label className="col-xs-10 col-sm-2 control-label">
          Açılış2:
                </label>
          <input
              id="add-field"
             label="Açılış-2:"
        type="text"
        name="acilic2"
          />
           
          <br/>
        
          <label className="col-xs-10 col-sm-2 control-label">
          Kapanış2:
                </label>
          <input
              id="add-field"
             label="Kapanış-2:"
        type="text"
        name="kapanis2"
          />
           
          <br/>
          
          <button className="btn btn-primary pull-right" onSubmit={onSubmit}>Ekle</button>
      </form>
      </div>
    );
  }
  
export default AddUpdateVenue;
  