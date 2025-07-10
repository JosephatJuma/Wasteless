import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://10.41.103.220:8080",
  //timeout: 4000,
  // Remove the headers property here entirely or at least omit Content-Type
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true,
});
