"use client"
import userApiSlice from '@/redux/features/user/userApiSlice'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

const ProcessOrder = () => {
    const [verify, { data, isSuccess, isError, isLoading, error }] = userApiSlice.useVerifyOrderMutation();
    const params = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (typeof localStorage !== 'undefined' && typeof location !== 'undefined') {
            localStorage.setItem('pending_order_url', location.href)
        }
        verify({
            session_id: params.get('session_id'),
            order_id: params.get('order_id'),
            upgrade: true

        })
    }, []);
    useEffect(() => {
        if (isSuccess) {

            if (typeof localStorage !== 'undefined' && typeof location !== 'undefined') {
                localStorage.removeItem('pending_order_url');
                location.replace('/dashboard/packages')
            }
        }
        if (isError) {
            console.log(error)
        }
    }, [isLoading])
    return (
        <div className="h-full w-full z-[300] p-4 fixed top-0 left-0 bg-base-1">
            <div className="bg-base-3 h-full w-full flex items-center justify-center">
                <div className="">
                    <p>Upgrading your order...</p>
                </div>
            </div>

        </div>
    )
}

export default ProcessOrder