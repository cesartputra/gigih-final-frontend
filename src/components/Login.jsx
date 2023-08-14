import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password });

            navigate('/');
        } catch (error) {
            setError('Login failed. Please check your username and password');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-dark">
            <div className="w-full max-w-md p-6 bg-neutral-800 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4 text-neutral-100">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
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
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border rounded-md bg-neutral-700 focus:outline-none focus:border-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}