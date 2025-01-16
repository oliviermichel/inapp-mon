"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';


const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check if the user is already logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            router.push('/'); // Redirect to the homepage or any other page
        }
    }, [router]);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        if (CheckLogin(username, password)) {
            // Handle successful login
            console.log('Login successful');
            localStorage.setItem('isLoggedIn', 'true'); // Set the login flag in localStorage
            router.push('/'); // Redirect to the homepage or any other page
        } else {
            // Handle login error
            setError('Login failed');
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
function CheckLogin(username: string, password: string): boolean {
    // Dummy implementation for demonstration purposes
    const validUsername = process.env.USERNAME;
    const validPassword = process.env.PASSWORD;

    if (!validUsername || !validPassword) {
        console.error('Please set the valid username and password in the environment variables');
        return false;
    }

    return username === validUsername && password === validPassword;
}


