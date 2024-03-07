"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

const WithAuth = ({ children }) => {
    const user = useSelector((state) => state.user);
    const router = useRouter();
    if (user.data?.logged_in) {
        return children;

    } else {
        router.replace('/login')
    }
}

export default WithAuth