"use client"
import React, { useEffect } from 'react'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { ButtonPrimary } from '../buttons/Buttons'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import userApiSlice from '@/redux/features/user/userApiSlice'
import { throwError } from '@/utils/message/message'

export const PackageCard = ({ item }) => {
    const user = useSelector(state => state.user)
    const permission_to_create = user.data?.permissions?.includes('package-create');
    useEffect(() => {
        if (getCookie('last_url') === location.href) {
            deleteCookie('last_url');
        }
    }, [])
    const setLastURL = () => {
        setCookie('last_url', location.href);
    }
    const [order, { isLoading, data, isError, error, isSuccess }] = userApiSlice.useOrderMutation();
    const handleOrder = (upgrade) => {
        let url = '';
        if (upgrade) {
            url = '/process-upgrade'
        } else {
            url = '/process-order'
        }
        order({
            package_id: item.id,
            success_url: location.origin + url,
            cancel_url: location.origin,
            upgrade: upgrade
        })
    }

    useEffect(() => {
        if (isSuccess) {
            if (typeof location !== 'undefined') {
                location.href = data.session.url;
            }
        }
        if (isError) {
            if ([404, 401, 409].includes(error.status)) {
                throwError('error', error.data.message)
            }

        }
    }, [isLoading])

    return (
        <div className="package-card p-6 text-center bg-base-3 rounded-2xl">
            <div className="package-header ">
                <div className="flex items-center justify-center gap-x-2">
                    <h5>{item?.name}</h5>
                    <h4 className='text-secondary'>{item?.discounted_price ? item?.discounted_price : item?.price} $</h4>
                </div>

                <span className='text-dark'>{item?.description}</span>
            </div>
            <div className="package-features mt-6">
                <ul className='flex flex-col items-center'>
                    {
                        item?.features.map((feature, index) =>
                            <li key={index} className='text-primary-dark flex items-center gap-x-2 tracking-wide' >
                                <FaRegCircleCheck />
                                {feature.name}
                            </li>
                        )
                    }

                </ul>
            </div>
            <div className="package-footer mt-4 flex items-center justify-center">
                {
                    permission_to_create ?
                        <Link href={'/dashboard/packages'}> <ButtonPrimary>Manage</ButtonPrimary></Link>
                        : user.data?.logged_in === true ?


                            (user?.data?.orders.length > 0 && user.data.orders[0].status === 'complete') ?
                                user.data.orders[0].package_id === item?.id ?
                                    <ButtonPrimary disabled={true}>Purchased</ButtonPrimary>
                                    :
                                    <ButtonPrimary onClick={() => handleOrder(true)}>{isLoading ? 'Please wait.' : 'Upgrade'}</ButtonPrimary>
                                :
                                <ButtonPrimary onClick={() => handleOrder(false)}>{isLoading ? 'Please wait.' : 'Order now'}</ButtonPrimary>


                            :
                            <Link href={'/login'} onClick={setLastURL}> <ButtonPrimary>Login to Purchase</ButtonPrimary></Link>
                }
            </div>
        </div>)
}
