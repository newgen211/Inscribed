import { createContext, useContext, useEffect, useState } from 'react';

export interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: any) {

    // Define a state variable to track whether the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Use the useEffect hook to check if a token is stored in local storage
    useEffect(() => {

        const token = localStorage.getItem('token');
        
        // If a token is found, set the isAuthenticated state to true
        if (token) {
            setIsAuthenticated(true);
        }

    }, []);

    // Handle login requests
    const login = (token: string) => {

        localStorage.setItem('token', token);
        setIsAuthenticated(true);

    };

    // Handle logout requests
    const logout = () => {

        localStorage.removeItem('token');
        setIsAuthenticated(false);

    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );


}