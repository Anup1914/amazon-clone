import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-iwa5t2jzfq-uc.a.run.app",
  //"http://127.0.0.1:5001/clone-25890/us-central1/api", /// The API (cloud function) URL
});

export default instance;
