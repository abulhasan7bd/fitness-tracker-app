import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
 
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <h3>Loading Protected Route......</h3>;
  }

  if (!user) {
    return <Navigate to="/register" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
