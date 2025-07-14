import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  //timeout: 4000,
  // Remove the headers property here entirely or at least omit Content-Type
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true,
});
