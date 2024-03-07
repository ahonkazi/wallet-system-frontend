"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

const AuthLess = ({ children }) => {
    const user = useSelector((state) => state.user);
    const router = useRouter();
    if (user.data?.logged_in) {
        router.replace('/dashboard')

    } else {
        return children;
    }
}

export default AuthLess