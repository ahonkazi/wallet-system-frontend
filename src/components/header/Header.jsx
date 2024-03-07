"use client"
import Link from 'next/link'
import React from 'react'
import { MdOutlineDashboard } from "react-icons/md";
import { ButtonPrimary } from '../buttons/Buttons';
const Header = () => {
    const menuItems = [
        { path: '/', name: 'Home' },
        { path: '/', name: 'About' },

    ]
    return (
        <header className='app-container font-base bg-base-1'>
            <nav className='flex items-center justify-between py-2'>
                <div className="logo">
                    <h3 className='font-semibold'>Logo</h3>
                </div>

                <menu className='flex items-center gap-x-4'>
                    <ul className='flex gap-x-3 items-center'>
                        {
                            menuItems.map((item, index) =>
                                <li key={index}>
                                    <Link href={'/'}>{item.name}</Link>
                                </li>
                            )
                        }

                        {/* <li className='flex items-center'>
                            <Link href={'/dashboard'} className='flex items-center gap-x-2'>
                                Dashboard
                            </Link>
                        </li> */}
                        <li className='flex items-center'>
                            <Link href={'/login'} className='flex btn-primary items-center gap-x-2'>
                                <ButtonPrimary>Login</ButtonPrimary>
                            </Link>
                        </li>

                    </ul>
                </menu>
            </nav>
        </header>
    )
}

export default Header