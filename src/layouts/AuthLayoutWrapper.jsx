import Header from '@/components/header/Header'
import React from 'react'

const AuthLayoutWrapper = ({ children }) => {
    return (
        <>
            <Header />
            {children}

        </>
    )
}

export default AuthLayoutWrapper