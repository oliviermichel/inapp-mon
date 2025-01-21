"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';


const Explorer: React.FC = () => {
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
        <div>
        </div>
    );
};

export default Explorer;





