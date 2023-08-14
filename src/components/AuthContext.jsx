import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const baseUrl = 'https://gigih-midterm-backend.onrender.com';
    
    const login = async (userData) => {
        try {
            const response = await axios.post(`${baseUrl}/api/auth/login`, userData);
                
            if (response.status === 200) {
                const data = response.data;
                setUser(data.data.userToLogin);
                setToken(data.data.token);

                sessionStorage.setItem('user', JSON.stringify(data.data.userToLogin));
                sessionStorage.setItem('token', data.data.token);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
        throw new Error('Login failed');
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    };

    // ... other authentication-related functions

    const value = {
        user,
        token,
        login,
        logout,
        // ... other authentication-related functions
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
