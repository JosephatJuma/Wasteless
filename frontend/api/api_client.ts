import axios from "axios";

export const apiCLient = axios.create({
  baseURL: "http://10.37.49.220:8081",
  headers: {
    "Content-Type": "application/json",
  },
  //withCredentials: true,
});
