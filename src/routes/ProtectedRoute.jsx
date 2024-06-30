import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const {isLoggedIn , user }= useSelector((state) => state.auth);
  console.log("Protected Route", isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.some(role => user.roles.includes(role))) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;