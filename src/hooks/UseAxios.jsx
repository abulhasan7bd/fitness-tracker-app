import React from 'react';
import axios from "axios";

const UseAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "https://server-side-rho-swart.vercel.app",
    withCredentials: true,  
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosInstance;
};

export default UseAxios;
