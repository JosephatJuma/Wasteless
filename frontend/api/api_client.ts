import axios from "axios";

export const apiCLient = axios.create({
  baseURL: "http://10.37.49.220:8081",
  // Remove the headers property here entirely or at least omit Content-Type
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true,
});
