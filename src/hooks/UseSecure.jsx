import React from "react";
import UseAxios from "./UseAxios";

const UseSecure = () => {
  const useAxios = UseAxios();
  const axiosInstance = useAxios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Attach token to every request
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  //token expiration or unauthorized access
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
       
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.removeItem("access-token");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default UseSecure;
