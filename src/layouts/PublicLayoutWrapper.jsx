import React from 'react'
import Header from '../components/header/Header'
import '../app/app.css';

const PublicLayoutWrapper = ({ children }) => {
    return (
        <>
            <Header />
            {children}

        </>
    )
}

export default PublicLayoutWrapper