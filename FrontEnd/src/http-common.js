import axios from "axios";

const http = axios.create({
  baseURL: "https://localhost:7777",
});

export const setAuthToken = (token) => {
  if (token && token !== undefined) {
    http.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      token
    )}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
};

export default http;
