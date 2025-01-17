"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
            <h1 style={{ fontSize: '3rem', textAlign: 'center' }}>InApp Monitoring</h1>
        </div>
    );
};

export default Dashboard;