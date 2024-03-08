"use client"
import React from 'react'
import { LoadingPage } from '@/components/skeleton/Loading';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Roles from './Roles';

const page = () => {
    const authUser = useSelector(state => state.user);
    let content = <LoadingPage />
    const router = useRouter();
    if (authUser.data?.permissions.includes('role-list')) {
        content = <Roles />
    } else {
        router.replace('/');
    }
    return content;
}

export default page