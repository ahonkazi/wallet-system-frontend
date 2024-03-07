import React from 'react'
import PublicLayoutWrapper from '../../../layouts/PublicLayoutWrapper';

const PublicLayout = ({ children }) => {
    return (
        <PublicLayoutWrapper>
            {children}
        </PublicLayoutWrapper>
    )
}

export default PublicLayout;