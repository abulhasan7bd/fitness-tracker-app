import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import LoadingSpiner from "../pages/loading/LoadingSpiner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();

  if (loading) {
    return <div><LoadingSpiner/></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
