import Header from '@/components/header/Header'
import React from 'react'
import '../app/app.css';
const AuthLayoutWrapper = ({ children }) => {
    
    return (
        <>
            <Header />
            {children}

        </>
    )
}

export default AuthLayoutWrapper