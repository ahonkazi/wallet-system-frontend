"use client"
import { DashboardTitle } from '@/components/typography/Typography'
import React from 'react'
import BankAccount from './_component/BankAccount'
import CardInfo from './_component/CardInfo'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

const Wallet = () => {
    const authUser = useSelector(state => state.user);
    let content = <LoadingPage />
    const router = useRouter();
    if (authUser.data?.permissions.includes('role-list')) {
        content = <div>
            <DashboardTitle>Your Wallet</DashboardTitle>
            <BankAccount />
            <CardInfo />
        </div>
    } else {
        router.replace('/');
    }
    return content;
}

export default Wallet