"use client"
import React from 'react'
import Users from './Users'
import { LoadingPage } from '@/components/skeleton/Loading';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const page = () => {
    const authUser = useSelector(state => state.user);
    let content = <LoadingPage />
    const router = useRouter();
    if (authUser.data?.permissions.includes('user-list')) {
        content = <Users />
    } else {
        router.replace('/');
    }
    return content;
}

export default page