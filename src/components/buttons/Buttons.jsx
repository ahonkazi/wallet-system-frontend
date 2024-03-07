import React from 'react'

export const ButtonPrimary = ({ children, fullwidth = false, ...otherProps }) => {
    return (
        <button {...otherProps} className={`bg-primary-light disabled:opacity-80 ${fullwidth && 'w-full'} px-8 py-2 rounded-full text-base-3`}>{children}</button>
    )
}
