// components/ProtectedRoute.js
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (!email) {
            router.push('/auth/login');
        }
    }, []);

    return children
};

export default ProtectedRoute;
