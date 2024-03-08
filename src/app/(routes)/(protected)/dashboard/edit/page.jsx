"use client"
import React from 'react'
import { LoadingPage } from '@/components/skeleton/Loading';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import EditProfile from './EditProfile';

const page = () => {
    const authUser = useSelector(state => state.user);
    let content = <LoadingPage />
    const router = useRouter();
    if (authUser.data?.permissions.includes('user-settings')) {
        content = <EditProfile />
    } else {
        router.replace('/');
    }
    return content;
}

export default page