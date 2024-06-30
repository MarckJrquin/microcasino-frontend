import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth);
  console.log("Public Route", isLoggedIn);

  return isLoggedIn ? <Navigate to="/home" /> : children;
};

export default PublicRoute;