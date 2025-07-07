import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://10.155.119.233:8080",
  // Remove the headers property here entirely or at least omit Content-Type
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true,
});
