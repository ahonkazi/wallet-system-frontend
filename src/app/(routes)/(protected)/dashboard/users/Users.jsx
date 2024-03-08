"use client"
import UserRoleCreateModal from '@/components/modals/UserRoleEditModal';
import { DashboardTitle } from '@/components/typography/Typography'
import adminApiSlice from '@/redux/features/admin/adminApiSlice';
import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { useSelector } from 'react-redux';
const Users = () => {

    const [load, { data, isLoading, isError, isSuccess, error }] = adminApiSlice.useGetAllUsersMutation();
    const [modalStatus, setModalStatus] = useState(false);
    const [user, setUser] = useState(false);
    useEffect(() => {
        load();
    }, [])
    let content = 'Loading...';
    if (isSuccess) {
        content = <div className="block w-full overflow-x-auto">
            {modalStatus && <UserRoleCreateModal load={load} user={user} closeModal={setModalStatus} />}

            <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                    <tr>
                        <th className="px-6   text-blueGray-500 align-middle border border-solid border-base-3 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            User name
                        </th>
                        <th className="px-6  text-blueGray-500 align-middle border border-solid border-base-3 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            email
                        </th>
                        <th className="px-6  text-blueGray-500 align-middle border border-solid border-base-3 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Roles
                        </th>
                        <th className="px-6  text-blueGray-500 align-middle border border-solid border-base-3 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data.users.map((item, index) => <UserItem setUser={setUser} modalStatus={modalStatus} setModalStatus={setModalStatus} user={item} key={index} />)}
                </tbody>

            </table>
        </div>
    }
    return (
        <div>
            <DashboardTitle>Users</DashboardTitle>
            <div className="main-wrapper">

                <section className="py-1 ">
                    <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto mt-24">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                            {content}
                        </div>
                    </div>

                </section>
            </div>
        </div>
    )
}

export default Users


const UserItem = ({ user, setUser, modalStatus, setModalStatus }) => {
    const authUser = useSelector(state => state.user);

    const handleEdit = () => {
        setModalStatus(true);
        setUser(user);
    }
    return (

        <>

            <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {user.name}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                    {user.email}
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                    <div className="flex flex-wrap gap-x-1 gap-y-1">
                        {
                            user.roles.map((item, index) =>
                                <div key={index} className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-secondary py-1.5 px-1.5 align-baseline font-sans text-[10px] font-bold uppercase leading-none text-white">
                                    {item.name}
                                </div>
                            )
                        }

                    </div>
                </td>
                {
                    authUser.data?.user?.id === user.id ?
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                            <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-primary-light py-1.5 px-1.5 align-baseline font-sans text-[10px] font-bold uppercase leading-none text-white">
                                You
                            </div>
                        </td>
                        :
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                            <button onClick={() => handleEdit()} className='text-xl'>
                                <BiEdit />
                            </button>
                        </td>
                }
            </tr >
        </>
    )
}