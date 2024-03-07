import { PackageCard } from '@/components/cards/PackageCard';
import publicApiSlice from '@/redux/features/public/publicApiSlice';
import React from 'react'

const PackageList = () => {
    const { data, isLoading, isSuccess, isError } = publicApiSlice.useGetPackagesQuery();
    let content =
        <div className='flex justify-center'>
            <h3>Loading...</h3>
        </div>
        ;
    if (isSuccess && data.packages.length > 0) {
        content = <div className="package-wrapper mt-wrapper grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
            {
                data.packages.map((item, index) =>
                    <div key={index} className="package-item">
                        <PackageCard key={index} item={item} />
                    </div>
                )
            }
        </div>
    }
    if (isSuccess && data.packages.length === 0) {
        content =
            <div className='flex justify-center'>
                <h3>No package available currently</h3>
            </div>
    }
    if (isError) {
        content =
            <div className='flex justify-center'>
                <h3>Something went wrong</h3>
            </div>
    }

    return (

        <div className="">
            {content}
        </div>
    )
}

export default PackageList