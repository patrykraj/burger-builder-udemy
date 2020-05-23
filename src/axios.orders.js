import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-e3e3b.firebaseio.com/",
});

export default instance;
