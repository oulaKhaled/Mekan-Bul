/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import FoodAndDrinkList from "./FoodAndDrinkList";
import AdminButton from "./AdminButton";
import { formatDistance } from "../services/Utils";
import VenueDetail from "./VenueDetail"; 
import VenueDataService from "../services/VenueDataService";

import VenueReducer from "../services/VenueReducer";
// eslint-disable-next-line no-unused-vars
import React from "react";

const Venue = ({ venue, admin }) => {
  const navigate = useNavigate()
  // eslint-disable-next-line react/prop-types
  const name = venue.name;
  const adress = venue.address;
  const foodanddrink = venue.foodanddrink;
  const distance = venue.distance;
  const Enlem = venue.coordinates[0];
  const Boylam = venue.coordinates[1];
  const Gunler1 = venue.hours[0].days;
  const acilic1 = venue.hours[0].open;
  const kapanis1 = venue.hours[0].close;
  const Gunler2 = venue.hours[1].days;
  const acilic2 = venue.hours[1].open;
  const kapanis2 = venue.hours[1].close;

  // eslint-disable-next-line no-unused-vars
  const [venues, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
 
// where should I put add, delete ,update methods
  const performClick = (evt) => {

    if (evt.target.name == " Mekan Güncelle") {
     
      console.log(venue._id);
      return navigate(`/updateVenue/${venue._id}`, {
        state: {
          name, adress, foodanddrink, distance, Enlem, Boylam, Gunler1, acilic1, kapanis1, Gunler2, acilic2
          , kapanis2
        }
     
     
      });
     
    }
    else if(evt.target.name==" Mekan Sil"){
      VenueDataService.removeVenue(venue._id).then(()=>{
        dispatchVenues({type:"REMOVE_VENUE"});
      });
      window.location.reload();
    }
  };


  return (
    <div className="list-group">
      <div className="col-xs-12 col-sm-12">
        <div className="col-xs-12 list-group-item">
          <h4>
            <NavLink to={`/venue/${venue._id}`} id={venue._id}>
              {venue.name}{" "}
            </NavLink>
            <Rating rating={venue.rating} />
          </h4>
          <span className="span badge pull-right badge-default">
            {!admin ? formatDistance(venue.distance) : ""}
          </span>

          <AdminButton type="primary" name=" Mekan Sil" onClick={performClick} />
          <AdminButton type="info" name=" Mekan Güncelle" onClick={performClick} />

          {admin ? (<AdminButton type="primary" name="Sil" onClick={performClick} />) : ""}
          {admin ? (<AdminButton type="info" name="Güncelle" onClick={performClick} />) : ""}

          <p className="address"> {venue.address}</p>
          <p>
            <FoodAndDrinkList foodAndDrinkList={venue.foodanddrink} />
          </p>

        </div>
      </div>
    </div>
  );
};
export default Venue;
