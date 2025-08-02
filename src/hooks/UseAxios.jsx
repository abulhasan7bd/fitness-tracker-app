import React from 'react';
import axios from "axios";
// http://localhost:5000/
// https://server-side-rho-swart.vercel.app
const UseAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,  
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosInstance;
};

export default UseAxios;
