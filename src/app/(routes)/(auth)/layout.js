import AuthLayoutWrapper from '@/layouts/AuthLayoutWrapper';
import AuthLess from '@/utils/wrapper/AuthLess';
import React from 'react'
import '../../app.css';
const AuthLayout = ({ children }) => {
    return (
        <AuthLess>
            <AuthLayoutWrapper>
                {children}
            </AuthLayoutWrapper>
        </AuthLess>
    )
}

export default AuthLayout;
