import React, { use } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from './AuthProvider';
import LoadingSpinner from '../Shared/LoadingSpinner';

const PrivetRoute = ({ children }) => {

    const { user, loading } = use(AuthContext)

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && user.email) {
        return children;
    }

    return <Navigate to={"/login"}></Navigate>





};

export default PrivetRoute;