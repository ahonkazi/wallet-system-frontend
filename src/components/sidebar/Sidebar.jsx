"use client"
import Link from 'next/link'
import React from 'react'
import { FaRegAddressCard, FaRegCircle, FaRegUser, FaUser } from 'react-icons/fa6';
import { LuPackageOpen } from "react-icons/lu";
import { FaRegFileAlt, FaSignOutAlt } from "react-icons/fa";
import { LiaPassportSolid } from "react-icons/lia";
import { MdOutlineSecurity } from 'react-icons/md';
import { usePathname } from 'next/navigation';
const Sidebar = () => {
    const menuList = [
        { name: "Orders", path: '/dashboard/orders', permissions: ['package-controll'], icon: <LuPackageOpen />, hasSubmenu: false },
        { name: "Packages", path: '/dashboard/packages', permissions: ['show-order'], icon: <FaRegFileAlt /> },
        {
            name: "User & role management", path: '/dashboard/users', permissions:
                ['role-control', 'user-control']
            , hasSubmenu: true,
            subMenu: [
                { name: "Users", path: '/dashboard/users', permissions: ['user-controll'], icon: <FaRegUser /> },
                { name: "Roles", path: '/dashboard/roles', permission: ['role-controll'], icon: <FaRegCircle /> },
                { name: "Permissions", path: '/dashboard/permissions', permission: ['permission-controll'], icon: <MdOutlineSecurity /> },

            ]
        },
        {
            name: "Identity", path: '/dashboard/users', permissions:
                ['identity-control']

            , hasSubmenu: true, roles: ['user'],
            subMenu: [
                { name: "Identity", path: '/dashboard/identity', permissions: ['identity-control'], icon: <FaRegAddressCard /> },

            ]
        },
        {
            name: "Settings", path: '/dashboard/settings', permissions:
                ['settings']

            , hasSubmenu: true, roles: ['users'],
            subMenu: [
                { name: "Profile", path: '/dashboard/edit', permissions: ['identity-control'], icon: <FaUser /> },
            ]
        },



    ]

    const pathName = usePathname();
    return (
        <aside>
            <div className="fixed flex z-[100] flex-col top-0 left-0 w-64 bg-white border-base-3 h-full border-r">
                <div className="flex items-center justify-center h-14 border-b border-base-3">
                    <Link href={'/'}>Back</Link>
                </div>
                <div className="overflow-y-auto overflow-x-hidden flex-grow">
                    <ul className="flex flex-col py-4 space-y-1">
                        <li className="px-5">
                            <div className="flex flex-row items-center h-8">
                                <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                            </div>
                        </li>
                        <li>
                            <Link href="/dashboard" className={`relative flex ${pathName === '/dashboard' && "!text-gray-800 !bg-gray-50 !border-indigo-500"} flex-row items-center h-11 focus:outline-none  text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-indigo-500 border-l-4 border-transparent  pr-6`}>
                                <span className="inline-flex justify-center items-center ml-4">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                            </Link>
                        </li>

                        {
                            menuList.map((item, index) =>
                                item.hasSubmenu ?
                                    <>
                                        <li key={index} className="px-5">
                                            <div className="flex flex-row items-center h-8">
                                                <div className="text-sm font-light tracking-wide text-gray-500">{item.name}</div>
                                            </div>
                                        </li>
                                        {
                                            item.subMenu.map((sItem, sIndex) =>
                                                <li key={sIndex}>
                                                    <Link href={sItem.path} className={`relative flex ${pathName === sItem.path && "!text-gray-800 !bg-gray-50 !border-indigo-500"} flex-row items-center h-11 focus:outline-none  text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-indigo-500 border-l-4 border-transparent  pr-6`}>
                                                        <span className="inline-flex justify-center items-center ml-4">
                                                            {sItem.icon}
                                                        </span>
                                                        <span className="ml-2 text-sm tracking-wide truncate">{sItem.name}</span>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    </>
                                    :
                                    <li key={index}>
                                        <Link href={item.path} className={`relative flex ${pathName === item.path && "!text-gray-800 !bg-gray-50 !border-indigo-500"} flex-row items-center h-11 focus:outline-none  text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-indigo-500 border-l-4 border-transparent  pr-6`}>
                                            <span className="inline-flex justify-center items-center ml-4">
                                                {item.icon}
                                            </span>
                                            <span className="ml-2 text-sm tracking-wide truncate">{item.name}</span>
                                            <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
                                        </Link>
                                    </li>

                            )
                        }

                        <li>
                            <button className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <FaSignOutAlt />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar