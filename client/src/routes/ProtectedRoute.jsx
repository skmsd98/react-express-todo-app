import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function ProtectedRoute({ allow, children }) {
    const { isUserAuthenticated } = useContext(AuthContext);

    // If user is not authenticated and trying to access main page, redirect to signin
    // If user is authenticated and trying to access signin or signup, redirect to the main page

    if (allow === "authenticated" && !isUserAuthenticated) {
        return <Navigate to="/signin" replace />;
    } else if (allow === "unAuthenticated" && isUserAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};