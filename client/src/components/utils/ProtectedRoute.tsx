import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    {/* Use the auth context */}
    const authContext = useContext(AuthContext);

    {/* Ensure the component is used within a AuthProvider */}
    if(!authContext) {
        throw new Error('ProtectedRoute must be used inside a AuthProvider');
    }

    {/* Return Route */}
    return (
        
        authContext.isAuthenticated ? <Outlet /> : <Navigate to='/' />

    );

};

export default ProtectedRoute;