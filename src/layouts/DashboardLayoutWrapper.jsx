import DashboardHeader from '@/components/header/DashboardHeader'
import Sidebar from '@/components/sidebar/Sidebar'
import WithAuth from '@/utils/wrapper/WithAuth'
import React from 'react'
import '../app/app.css';

const DashboardLayoutWrapper = ({ children }) => {
    return (
        <div>
            <div className="min-h-screen flex flex-col text-dark flex-auto flex-shrink-0 antialiased ">
                <Sidebar />
                <DashboardHeader />
                <div>
                    <div className="flex pt-14 pl-64 pb-14 flex-col text-dark flex-auto flex-shrink-0 antialiased ">
                        <div className="p-8">
                            {children}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardLayoutWrapper