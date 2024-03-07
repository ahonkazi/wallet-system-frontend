import React from 'react'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { ButtonPrimary } from '../buttons/Buttons'

export const PackageCard = () => {
    return (
        <div className="package-card p-6 text-center bg-base-3 rounded-2xl">
            <div className="package-header ">
                <div className="flex items-center justify-center gap-x-2">
                    <h5>Premium</h5>
                    <h4 className='text-secondary'>501 $</h4>
                </div>

                <span className='text-dark'>This package for our premium users</span>
            </div>
            <div className="package-features mt-6">
                <ul className='flex flex-col items-center'>
                    <li className='text-primary-dark flex items-center gap-x-2 tracking-wide' >
                        <FaRegCircleCheck />
                        Unlimited sub domain
                    </li>
                    <li className='text-primary-dark flex items-center gap-x-2 tracking-wide' >
                        <FaRegCircleCheck />
                        Unlimited emails
                    </li>
                </ul>
            </div>
            <div className="package-footer mt-4 flex items-center justify-center">
                <ButtonPrimary>Order now</ButtonPrimary>
            </div>
        </div>)
}
