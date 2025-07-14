import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:3000",
  // Optional: uncomment below if needed
  // timeout: 4000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true,
});
