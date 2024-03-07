import React from 'react'

export const InputField = ({ label, value, setValue, type = 'text', placeholder = '' }) => {
    return (
        <div className="input-item">
            <span>{label}</span>
            <input placeholder={placeholder} type={type} className='w-full border border-dark mt-1 py-2 px-6 rounded outline-none ' />
        </div>
    )
}
