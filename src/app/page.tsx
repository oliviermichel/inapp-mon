"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            // Redirect to the login page if the user is not logged in
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-4xl">Welcome to the home page</div>
        </div>
    );
};

export default Home;