import React from 'react'
import Header from '../components/header/Header'

const PublicLayoutWrapper = ({ children }) => {
    return (
        <>
            <Header />
            {children}

        </>
    )
}

export default PublicLayoutWrapper