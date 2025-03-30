import React from 'react'

export const Privateroute = ({children}) => {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/login" replace />;
}
import { Navigate } from "react-router-dom";

