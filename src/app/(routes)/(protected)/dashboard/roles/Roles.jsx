"use client"
import { ButtonPrimary } from '@/components/buttons/Buttons';
import AddRoleModal from '@/components/modals/AddRoleModal';
import EditRoleModal from '@/components/modals/EditRoleModal';
import UserRoleCreateModal from '@/components/modals/UserRoleEditModal';
import { DashboardTitle } from '@/components/typography/Typography'
import adminApiSlice from '@/redux/features/admin/adminApiSlice';
import React, { useEffect, useState } from 'react'
import { BiEdit } from "react-icons/bi";
import { useSelector } from 'react-redux';
const Roles = () => {

    const [load, { data, isLoading, isError, isSuccess, error }] = adminApiSlice.useGetAllRolesMutation();
    const [addModalStatus, setaddModalStatus] = useState(false);
    const [editModalStatus, setEditModalStatus] = useState(false);
    const [role, setRole] = useState(false);
    const [roleList, setRoleList] = useState([]);
    const user = useSelector(state => state.user)
    const permission_to_create = user.data?.permissions?.includes('role-create');

    useEffect(() => {
        load();
    }, [])
    let content = 'Loading...';

    useEffect(() => {
        if (isSuccess) {
            setRoleList(data.roles);
        }
    }, [isLoading])
    if (isSuccess) {

        content = <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                    <tr className=''>
                        <th className="px-6   text-blueGray-500  border border-solid border-base-3 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Role name
                        </th>
                        <th className="px-6   text-blueGray-500  border border-solid border-base-3 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Permissions
                        </th>

                        <th className="px-6  text-blueGray-500  border border-solid border-base-3 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {roleList.map((item, index) => <RoleItem setModalStatus={setEditModalStatus} setRole={setRole} role={item} key={index} />)}
                </tbody>

            </table>
        </div>
    }
    return (
        <div>
            {addModalStatus && <AddRoleModal load={load} closeModal={setaddModalStatus} />}
            {editModalStatus && <EditRoleModal role={role} load={load} closeModal={setEditModalStatus} />}

            <div className="flex justify-between items-center">
                <DashboardTitle>Roles</DashboardTitle>
                {permission_to_create && (
                    <ButtonPrimary onClick={() => setaddModalStatus(true)}>Add new Role</ButtonPrimary>
                )}
            </div>

            <div className="main-wrapper">

                <section className="py-1 ">
                    <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto mt-24">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                            {content}
                        </div>
                    </div>

                </section>
            </div>
        </div >
    )
}

export default Roles


const RoleItem = ({ role, setRole, setModalStatus }) => {
    const handleEdit = () => {
        setModalStatus(true);
        // setUser(user);
        setRole(role)
    }
    const [getRolePermissions, { data, isSuccess }] = adminApiSlice.useRolePermissionsMutation();
    useEffect(() => {
        getRolePermissions(role.id);
    }, [])

    return (

        <>

            <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                    <p className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-primary-light py-1.5 px-1.5 align-baseline font-sans text-[10px] font-bold uppercase leading-none text-white">
                        {role.name}
                    </p>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                    {isSuccess && (data?.permissions.length)}
                </td>


                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                    <button disabled={role.name.toLowerCase() === 'admin'} onClick={() => handleEdit()} className='text-xl disabled:opacity-60'>
                        <BiEdit />
                    </button>
                </td>

            </tr >
        </>
    )
}