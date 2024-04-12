import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming context

export const PrivateRouter = () => {
  const { currentUser } = useAuth();
  console.log('currentUser in PrivateRouter: ', currentUser); // Add log
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};