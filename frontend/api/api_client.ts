import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://192.168.100.101:8080",
  timeout: 4000,
  // Remove the headers property here entirely or at least omit Content-Type
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true,
});
