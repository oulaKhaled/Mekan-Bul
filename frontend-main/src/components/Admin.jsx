import Header from "./Header";
import React from "react";
import VenueReducer from "../services/VenueReducer";
import VenueDataService from "../services/VenueDataService";
import VenueList from "./VenueList";



function Admin() {
  // eslint-disable-next-line no-unused-vars
  const [venues, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  });



  React.useEffect(() => {
    dispatchVenues({ type: "FETCH_INIT" });
    try {
      VenueDataService.listAllVenues()
      .then((result) => {
        dispatchVenues({
          type: "FETCH_SUCCESS",
          payload: result.data,
        });
        console.log(result.data);
       
      });
    } catch(error) {
      
      dispatchVenues({ type: "FETCH_FAILURE" });
      console.log(error);
      
    }
  }, []);






  return (
    <>
      <Header
        headerText="Yönetici"
        motto="Mekanlarınızı Yönetin!"
      />
<VenueList venues={venues.data}/>

    </>
  );
}

export default Admin;
