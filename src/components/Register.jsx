import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const { user, login } = useAuth();
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [error, setError] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showCheckPassword, setShowCheckPassword] = useState(false);

    useEffect(() => {
        if(user){
            navigate('/')
        }
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleCheckPasswordVisibility = () => {
        setShowCheckPassword(!showCheckPassword);
    };

    const baseUrl = 'http://localhost:3000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== checkPassword) {
            setError('Password and Check Password are different');
        } else {
            try {
                const response = await axios.post(`${baseUrl}/api/auth/register`, {
                    username,
                    password,
                    avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                });
                console.log(response);
                if (response.status === 200) {
                    // Automatically log in the user after successful registration
                    await login({ username, password });
                    navigate('/');
                } else {
                    setError('Registration failed');
                }
            } catch (error) {
                setError('Registration failed');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-dark">
            <div className="w-full max-w-md p-6 bg-neutral-800 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4 text-neutral-100">Register</h1>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block font-medium mb-1 text-neutral-200">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-2 border rounded-md bg-neutral-700 focus:outline-none focus:border-blue-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-medium mb-1 text-neutral-200">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="w-full p-2 border rounded-md bg-neutral-700 focus:outline-none focus:border-blue-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-neutral-300 hover:text-neutral-100 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="checkPassword" className="block font-medium mb-1 text-neutral-200">
                            Check Password
                        </label>
                        <div className="relative">
                            <input
                                type={showCheckPassword ? 'text' : 'password'}
                                id="checkPassword"
                                className="w-full p-2 border rounded-md bg-neutral-700 focus:outline-none focus:border-blue-400"
                                value={checkPassword}
                                onChange={(e) => setCheckPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-neutral-300 hover:text-neutral-100 focus:outline-none"
                                onClick={toggleCheckPasswordVisibility}
                            >
                                {showCheckPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
