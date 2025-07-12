import React from 'react';
import axios from "axios";

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
