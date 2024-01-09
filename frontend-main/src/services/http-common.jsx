import axios from "axios";
export default axios.create({
  baseURL: "https://mekan-bul-esb7.vercel.app/",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  },
});
