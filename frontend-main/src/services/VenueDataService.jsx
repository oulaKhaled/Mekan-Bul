import http from "./http-common";

class VenueDataService {
  
  listAllVenues() {
    return http.get("/admin");
  }

  listJsonVenues() {
    return http.get();
  }

  nearbyVenues(lat,long) {
    return http.get(`/venues?lat=${lat}&long=${long}`);
  }

  getVenue(id) {
    return http.get(`venues/${id}`);
  }

  addVenue(data) {
    return http.post("/venues", data);
  }

  updateVenue(id, data) {
    return http.put(`/venues/${id}`, data);
  }

  removeVenue(id) {
    return http.delete(`/venues/${id}`);
  }

  login(data){
    return http.post("/login",data);
  }

  register(data){
    return http.post("/register",data);
  }
  deleteAllVenues() {
    return http.delete("/venue");
  }
  getComment(venueID, commentID) {
    return http.get(`/venue/${venueID}/comments/${commentID}`);
  }
  updateComment(venueID, commentID, data) {
    return http.put(`/venue/${venueID}/comments/${commentID}`, data);
  }
  addComment(mekanid, data) {
    return http.post(`/venues/${mekanid}/comments`, data);
  }
  removeComment(venueID, yorumid) {
    return http.delete(`/venue/${venueID}/comments/${yorumid}`);
  }
}

export default new VenueDataService();
