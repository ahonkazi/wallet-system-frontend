import DashboardLayoutWrapper from '@/layouts/DashboardLayoutWrapper'
import WithAuth from '@/utils/wrapper/WithAuth'
import React from 'react'

const DashboardLayout = ({ children }) => {
    return (
        <WithAuth>
            <DashboardLayoutWrapper>
                {children}
            </DashboardLayoutWrapper>
        </WithAuth>
    )
}

export default DashboardLayout