import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const sessionId = sessionStorage.getItem("sessionId"); 
  return sessionId ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
