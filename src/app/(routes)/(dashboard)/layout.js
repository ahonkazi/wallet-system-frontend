import DashboardLayoutWrapper from '@/layouts/DashboardLayoutWrapper'
import React from 'react'

const DashboardLayout = ({ children }) => {
    return (
        <DashboardLayoutWrapper>
            {children}
        </DashboardLayoutWrapper>
    )
}

export default DashboardLayout