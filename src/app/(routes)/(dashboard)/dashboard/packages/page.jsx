import { ButtonPrimary } from '@/components/buttons/Buttons'
import { PackageCard } from '@/components/cards/PackageCard'
import React from 'react'

const Packages = () => {
    return (
        <div>
            <div className="section-title flex justify-between items-center">
                <p className='font-base-2'>Packages</p>
                <div className="">
                    <ButtonPrimary>Add new package</ButtonPrimary>
                </div>
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

export default Packages