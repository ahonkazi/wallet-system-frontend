import DashboardHeader from '@/components/header/DashboardHeader'
import Sidebar from '@/components/sidebar/Sidebar'
import React from 'react'

const DashboardLayoutWrapper = ({ children }) => {
    return (
        <div>
            <div class="min-h-screen flex flex-col text-dark flex-auto flex-shrink-0 antialiased ">
                <Sidebar />
                <DashboardHeader />
                <div>
                    <div class="flex pt-14 pl-64 flex-col text-dark flex-auto flex-shrink-0 antialiased ">
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