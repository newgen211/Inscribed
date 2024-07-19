import { jwtDecode } from 'jwt-decode';
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

        const token: string | null = localStorage.getItem('token');
        
        try {

            // If a token is found, set the isAuthenticated state to true
            if (token) {

                // Decode the jwt
                const decoded: { userId: string, account_verified: boolean, exp: number } = jwtDecode(token);

                // Check if the token is expired
                if(decoded.exp * 1000 > Date.now()) {
                    
                    setIsAuthenticated(true);

                }
                
                else {

                    localStorage.removeItem('token');

                }
                
            }

        }

        catch(error) {

            localStorage.removeItem('token');

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