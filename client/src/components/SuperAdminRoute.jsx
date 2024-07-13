import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const SuperadminRoute = ({ children }) => {
    const { user, loading, isSuperadmin } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!isSuperadmin) {
        return <Navigate to="/Dashboard" />;
    }

    return children;
};

export default SuperadminRoute;
