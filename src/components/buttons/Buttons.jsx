import React from 'react'

export const ButtonPrimary = ({ children, fullwidth = false }) => {
    return (
        <button className={`bg-primary-light ${fullwidth && 'w-full'} px-8 py-2 rounded-full text-base-3`}>{children}</button>
    )
}
