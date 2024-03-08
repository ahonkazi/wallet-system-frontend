"use client"
import { DashboardTitle } from '@/components/typography/Typography'
import React, { useEffect } from 'react'
import NID from './_components/NID'
import PassportInfo from './_components/Passport'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { LoadingPage } from '@/components/skeleton/Loading'

const Identity = () => {
    const user = useSelector(state => state.user);
    const router = useRouter();
    let content = <LoadingPage />;
    if (user.data) {
        if (user.data.can_see_identity_section === false) {
            if (typeof location !== 'undefined') {
                router.replace('/');
            }
        } else {
            content = <div>
                <DashboardTitle>Your Identity</DashboardTitle>

                <NID />
                <PassportInfo />
            </div>
        }
    }
    return content;
}

export default Identity