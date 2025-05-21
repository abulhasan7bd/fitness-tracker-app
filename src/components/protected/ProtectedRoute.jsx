import React from "react";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user,loading } = use(AuthContext);
  console.log(loading)
  console.log(user)
   let location = useLocation();

   if(loading){
    return <h2>Loading....</h2>
   }
  if (!user) {
  return  <Navigate to="/register" state={{ from: location}}/>;
  }
  return children;
};

export default ProtectedRoute;
