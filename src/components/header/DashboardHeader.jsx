"use client"
import Link from 'next/link'
import React from 'react'

const DashboardHeader = () => {
    return (
        <header>
            <div className='fixed flex flex-col w-full top-0 left-0 bg-white '>
                <div className="flex items-center justify-end pl-64 h-14 border-b border-base-3">
                    {/* <Link href={'/'}>Back</Link> */}
                </div>
            </div>
        </header>
    )
}

export default DashboardHeader