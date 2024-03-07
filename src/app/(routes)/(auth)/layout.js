import AuthLayoutWrapper from '@/layouts/AuthLayoutWrapper';
import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <AuthLayoutWrapper>
            {children}
        </AuthLayoutWrapper>
    )
}

export default AuthLayout;
