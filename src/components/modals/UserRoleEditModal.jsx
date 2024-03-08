"use client"
import adminApiSlice from '@/redux/features/admin/adminApiSlice';
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { Checkbox } from '../checkbox/Checkbox';
import { throwError } from '@/utils/message/message';
const UserRoleCreateModal = ({ load, closeModal, user }) => {
    const [getRoles, { data, isError, isLoading, isSuccess, error }] = adminApiSlice.useGetAllRolesMutation();
    const [assign, { data: assignData, isLoading: assignLoading, isSuccess: assignSuccess, isError: assignIsError, error: assignError }] = adminApiSlice.useAssignRolesMutation();

    const [roles, setRoles] = useState([])
    const userRoles = user.roles?.map(item => {
        return item.name;
    })
    const [checkedRoles, setCheckedRoles] = useState(userRoles);
    useEffect(() => {
        getRoles();
    }, [])
    useEffect(() => {
        if (isSuccess) {
            setRoles(data.roles)
        }
    }, [isSuccess])
    const handleOnchange = (e) => {
        console.log(e.target.value)
        if (checkedRoles.includes(e.target.value)) {
            let newRole = checkedRoles.filter(r => r !== e.target.value)
            setCheckedRoles(newRole);
        } else {
            setCheckedRoles((prevRole) => [...prevRole, e.target.value]);

        }

    }

    const handleUpdate = () => {
        if (checkedRoles.length > 0) {
            assign({ user_id: user.id, role_names: checkedRoles })
        }
    }
    useEffect(() => {
        if (assignSuccess) {
            console.log(assignData);
            throwError('success', assignData.message);
            closeModal(false)
            load();
        }
    }, [assignLoading])
    return (
        <div>
            <div className="fixed z-[200] bg-black bg-opacity-40  inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <AnimatePresence>
                        <motion.div transition={{ duration: 0.2, damping: 0, type: 'keyframes' }} initial={{ scale: 0.99, y: '-100px' }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.99, y: '-100px' }} className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white md:w-[500px] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full mt-3  sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline"> Md Aohinuzzaman ahon </h3>

                                        <div className="roles mt-2">
                                            <h3 className="text-xl leading-6 font-medium text-gray-900" id="modal-headline">Roles:</h3>
                                            <div className="">
                                                <div className="roles-wrapper">
                                                    {
                                                        roles.map((item, index) =>
                                                            <div key={index} className="role-item flex items-center gap-x-2">
                                                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">{item.name}</h3>
                                                                <Checkbox checked={checkedRoles.includes(item.name)} value={item.name} onChange={(e) => handleOnchange(e)} />
                                                            </div>)
                                                    }

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={() => handleUpdate()} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">Update </button>
                                <button onClick={() => closeModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default UserRoleCreateModal

