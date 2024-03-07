"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaCcMastercard, FaRegAddressCard, FaRegCircle, FaRegUser, FaUser } from 'react-icons/fa6';
import { LuPackageOpen } from "react-icons/lu";
import { FaRegFileAlt, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineSecurity } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import userApiSlice from '@/redux/features/user/userApiSlice';
const Sidebar = () => {
    const user = useSelector(state => state.user);
    const [logout, { isLoading, isSuccess, isError, error }] = userApiSlice.useLogoutMutation();
    const menuList = [
        { name: "Orders", path: '/dashboard/orders', permission: 'order-list', icon: <LuPackageOpen />, hasSubmenu: false },
        { name: "Packages", path: '/dashboard/packages', permission: 'package-list', icon: <FaRegFileAlt /> },
        { name: "Users", path: '/dashboard/users', permission: 'user-list', icon: <FaRegUser /> },
        { name: "Roles", path: '/dashboard/roles', permission: 'role-list', icon: <FaRegCircle /> },
        { name: "Permissions", path: '/dashboard/permissions', permission: 'permission-list', icon: <MdOutlineSecurity /> },

        {
            name: "Wallet", path: '/dashboard/wallet', permission: 'wallet-list'

            , hasSubmenu: true, roles: ['user', 'admin'],
            subMenu: [
                { name: "Wallet", path: '/dashboard/wallet', permission: 'wallet-list', icon: <FaCcMastercard /> },

            ]
        },

        {
            name: "Settings", path: '/dashboard/settings', permission: 'user-settings'
            , hasSubmenu: true, roles: ['users'],
            subMenu: [
                { name: "Profile", path: '/dashboard/edit', permission: ['identity-control'], icon: <FaUser /> },
            ]
        },



    ]
    const handleLogout = () => {
        logout();
    }
    useEffect(() => {
        if (isSuccess) {
            if (typeof location !== 'undefined') {
                location.replace('/');
            }
        }
        if (isError) {
            console.log(error)
        }
    }, [isLoading])
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
                                <MenuItem key={index} item={item} index={index} />

                            )
                        }

                        {user.data.can_see_identity_section && (
                            <Link href={'/dashboard/identity'}>
                                <button className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <FaRegAddressCard />
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">Identity</span>
                                </button>
                            </Link>
                        )}


                        <li>
                            <button onClick={handleLogout} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
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

const MenuItem = ({ index, item }) => {
    const user = useSelector(state => state.user);
    const pathName = usePathname();
    if (user.data.permissions.includes(item.permission)) {
        return (
            item.hasSubmenu ?
                <li key={index} className="px-5">

                    <div className="flex flex-row items-center h-8">
                        <div className="text-sm font-light tracking-wide text-gray-500">{item.name}</div>
                    </div>

                    {
                        item.subMenu.map((sItem, sIndex) =>

                            <Link key={sIndex} href={sItem.path} className={`relative flex ${pathName === sItem.path && "!text-gray-800 !bg-gray-50 !border-indigo-500"} flex-row items-center h-11 focus:outline-none  text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-indigo-500 border-l-4 border-transparent  pr-6`}>
                                <span className="inline-flex justify-center items-center ml-4">
                                    {sItem.icon}
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate">{sItem.name}</span>
                            </Link>

                        )
                    }
                </li>
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

}