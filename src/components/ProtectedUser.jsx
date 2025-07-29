import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

const ProtectedUser = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedUser;
