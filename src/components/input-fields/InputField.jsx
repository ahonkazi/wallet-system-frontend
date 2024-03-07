import React from 'react'

export const InputField = ({ label, type, value, setValue }) => {
    return (
        <div className="input-item">
            <span>{label}</span>
            <input type="text" className='w-full border border-dark mt-1 py-2 px-6 rounded outline-none ' />
        </div>
    )
}
