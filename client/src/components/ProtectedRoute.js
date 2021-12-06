import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useStore from "../store";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
