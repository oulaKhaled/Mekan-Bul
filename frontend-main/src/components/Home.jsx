/* eslint-disable react/jsx-key */
import InputWithLabel from "./InputWithLabel";
import VenueList from "./VenueList";
import VenueReducer from "../services/VenueReducer";
import Venue from "./Venue";
import Header from "./Header";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import VenueDataService from "../services/VenueDataService";
import FoodAndDrinkList from "./FoodAndDrinkList";
import { NavLink } from "react-router-dom";

import Rating from "./Rating";
const useCookies = (key, defaultValue) => {
  const [cookie, setCookie] = React.useState(
    localStorage.getItem(key) || defaultValue
  );
  React.useEffect(() => {
    localStorage.setItem(key, cookie);
  }, [cookie, key]);
  return [cookie, setCookie];
};

const Home = () => {
  const [searchVenue, setSearchVenue] = useCookies("searchVenue", "");
  const [venues, dispatchVenues] = React.useReducer(VenueReducer, {
    data: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const search = (event) => {
    setSearchVenue(event.target.value);}
  
  const [coordinate,setCoordinate]=useState(
    {
    lat:0,
    long:0,
  });


  React.useEffect(()=>{
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(function(position){
        setCoordinate({
          lat:position.coords.latitude,
          long:position.coords.longitude,
        });
      
      });
    }
  },[]);

  React.useEffect(() => {
    dispatchVenues({ type: "FETCH_INIT" });
    try {
      console.log(coordinate.lat,coordinate.long);
      VenueDataService.nearbyVenues(coordinate.lat,coordinate.long)
      .then((result) => {
        dispatchVenues({
          type: "FETCH_SUCCESS",
          payload: result.data,
        });
        // console.log(result.data);
        console.log(venues.data);
      });
     

    } catch {
      
      dispatchVenues({ type: "FETCH_FAILURE" });
    }
  }, [coordinate.lat,coordinate.long]);



const dataobjects=venues.data;
  const filteredVenues = Object.values(dataobjects).filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchVenue.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchVenue.toLowerCase())
   );
  

  return (
    <div>
      <Header
        headerText="Mekanbul"
        motto="Civarınızdaki Mekanlarınızı Keşfedin!"
      />
      <InputWithLabel
        id="arama"
        label="Mekan Ara:"
        type="text"
        isFocused
        onInputChange={search}
        value={searchVenue}
      />
      <hr />
      {venues.isError ? (
        <p>
          <strong>Birşeyler ters gitti! ...</strong>
        </p>
      ) : venues.isLoading ? (
        <p>
          <strong>Mekanlar Yükleniyor ...</strong>
        </p>
      ) :venues.isSuccess && (
        Object.values(filteredVenues).map((venue,) => (
          <div className="list-group">
      <div className="col-xs-12 col-sm-12">
        <div className="col-xs-12 list-group-item">
          <h4>
            <NavLink to={`/venue/${venue.id}`} id={venue._id}>
              {venue.name}{" "}
            </NavLink>
            <Rating rating={venue.rating} />
          </h4>
          <p className="address"> {venue.address}</p>
          <p>
            <FoodAndDrinkList foodAndDrinkList={venue.foodanddrink} />
          </p>
        </div>
      </div>
    </div>
      ))
      )}
      
  </div>
  );
};

export default Home;
  {/* venues.data.map((venue)=>{
      <p>{venues.data[venue].name}</p>
    }) */} {/* <ul>{
    venues.map((object,index)=>(
      <li key={index}>{object.name}</li>
    ))
  // }</ul> */}
  // , <ul>{
  //      Object.values(filteredVenues).map((venue,index)=>{
  //       <li key={index}>{venue.name}</li>
  //      })
  //       }</ul>