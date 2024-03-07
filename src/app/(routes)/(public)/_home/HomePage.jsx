"use client"
import { PackageCard } from '@/components/cards/PackageCard';
import React from 'react'
const HomePage = () => {
    return (
        <div className='app-container mt-page'>
            <div className="section-title">
                <p className='font-base-2'>Our available packages</p>
            </div>
            <div className="package-wrapper mt-wrapper grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
                <div className="package-item">
                    <PackageCard />
                </div>
                <div className="package-item">
                    <PackageCard />
                </div>
                <div className="package-item">
                    <PackageCard />
                </div>
            </div>
        </div>
    )
}

export default HomePage