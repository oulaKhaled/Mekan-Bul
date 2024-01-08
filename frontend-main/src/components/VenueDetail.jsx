import { NavLink } from "react-router-dom";
import { useParams,useLocation } from "react-router-dom";
import Rating from "./Rating";
import FoodAndDrinkList from "./FoodAndDrinkList";
import Header from "./Header";
import HourList from "./HourList";
import CommentList from "./CommentList";
import VenueReducer from "../services/VenueReducer";
import VenuDataService from "../services/VenueDataService";
import React from "react";
const VenueDetail = () => {
  const [venues, dispatchVenue] = React.useReducer(VenueReducer, {
    data:{},
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
 const { id } = useParams();

  // eslint-disable-next-line no-unused-vars
  let location = useLocation();
 // here I should put add, delete , update comments
 
  React.useEffect(() => {
    dispatchVenue({ type: "FETCH_INIT" });
    try{
      
    VenuDataService.getVenue(id)
    .then((result) => {
      dispatchVenue({
        type: "FETCH_SUCCESS",
        payload: result.data,
      });
     
    });
    
     }catch(error){
        dispatchVenue({ type: "FETCH_FAILURE" });
        console.log("ERROR: ",error);
     }
  }, [id]);

  // React.useEffect(()=>{
  //   console.log(venues.data);
  // },[])
  if (venues.isSuccess) {
    return (
      <div>
     
        <Header headerText={venues.data.name} />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-12">
              <div className="row">
                <div className="col-xs-12 col-sm-6 ">
                  <p className="rating">
                    <Rating rating={venues.data.rating} />
                  </p>
                  <p>{venues.data.address}</p>
                  <div className="panel panel-primary">
                    <div className="panel-heading ">
                      <h2 className="panel-title ">Açılış Saatleri</h2>
                    </div>
                    <div className="panel-body ">
                      {venues.isSuccess ? (
                        <HourList hourList={venues.data.hours} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="panel panel-primary">
                    <div className="panel-heading ">
                      <h2 className="panel-title ">Neler Var?</h2>
                    </div>
                    <div className="panel-body ">
                      {venues.isSuccess ? (
                        <FoodAndDrinkList
                          foodAndDrinkList={venues.data.foodanddrink}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="panel panel-primary">
                    <div className="panel-heading ">
                      <h2 className="panel-title ">Konum Bilgisi</h2>
                    </div>
                    <div className="panel-body ">
                      <img
                        className="img img-responsive img-rounded"
                        alt="Konum Bilgisi"
                        src={`http://maps.googleapis.com/maps/api/staticmap?center=${
                          venues.data.coordinates
                        }&zoom=12&size=600x400&markers=${
                          venues.data.coordinates
                        }&key=AIzaSyCmmKygTpBzHGOZEciJpAdxC9v_tWHagnE`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 ">
                <div className="panel panel-primary">
                  <div className="panel-heading ">
                    <NavLink
                      className="btn btn-default pull-right"
                      to={`/venue/${id}/comment/new`}
                      state={{ name: venues.data.name }}
                    >
                      Yorum Ekle{" "}
                    </NavLink>
                    <h2 className="panel-title ">Yorumlar</h2>
                  </div>
                  <div className="panel-body ">
                    <CommentList commentList={venues.data.comments} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <Header />;
};
export default VenueDetail;
