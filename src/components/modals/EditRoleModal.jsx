"use client"
import adminApiSlice from '@/redux/features/admin/adminApiSlice';
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { Checkbox } from '../checkbox/Checkbox';
import { throwError } from '@/utils/message/message';
import { InputField } from '../input-fields/InputField';
const EditRoleModal = ({ load, closeModal, role }) => {
    const [loadPermissions, { data, isLoading, isError, isSuccess, error }] = adminApiSlice.useGetAllPermissionsMutation();
    const [updateRole, { data: updatedData, isLoading: updateLoading, isError: updateIsError, isSuccess: updateIsSuccess, error: updateError }] = adminApiSlice.useEditRoleMutation();
    const [getRolePermissions, { data: rolePermissionData, error: rolePermissionFetchError, isLoading: rolePermissionFetchLoading, isSuccess: rolePermissionSuccess }] = adminApiSlice.useRolePermissionsMutation();
    const [permissions, setPermissions] = useState([]);
    const [roleName, setRoleName] = useState(role.name);
    useEffect(() => {
        loadPermissions();
        getRolePermissions(role.id);
    }, [])

    useEffect(() => {
        if (isSuccess) {
            setPermissions(data.permissions);
        }
    }, [isLoading])
    const [checkedPermissions, setCheckedPermissions] = useState([]);


    useEffect(() => {
        if (rolePermissionSuccess) {
            let newArray = rolePermissionData.permissions.map(i => i.name);
            setCheckedPermissions(newArray)
        }

    }, [rolePermissionFetchLoading])
    const handleOnchange = (e) => {
        if (checkedPermissions.includes(e.target.value)) {
            let newData = checkedPermissions.filter(p => p !== e.target.value);
            setCheckedPermissions(newData)
        } else {
            setCheckedPermissions((p) => [...p, e.target.value])
        }
    }
    const handleSave = () => {

        updateRole({ name: roleName, permissions: checkedPermissions, id: role.id })

    }
    useEffect(() => {
        if (updateIsSuccess) {
            console.log(updatedData);
            load();
            closeModal();
        }
        if (updateIsError) {
            console.log(updateError)
            if ([422, 401, 404].includes(updateError.status)) {
                throwError('error', updateError.data.message)
            }
        }
    }, [updateLoading])

    return (
        <div>
            <div className="fixed z-[200] bg-black bg-opacity-40  inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <AnimatePresence>
                        <motion.div transition={{ duration: 0.2, damping: 0, type: 'keyframes' }} initial={{ scale: 0.99, y: '-100px' }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.99, y: '-100px' }} className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white md:w-[500px] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full  sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-xl leading-6 font-medium text-gray-900" id="modal-headline">Edit Role</h3>
                                        <div className="mt-3">
                                            <InputField value={roleName} setValue={setRoleName} label={'Role name'} />
                                        </div>
                                        <div className="permissions mt-2">
                                            <div className="">
                                                <div className="roles-wrapper flex gap-x-2 flex-wrap">
                                                    {
                                                        permissions.map((item, index) =>
                                                            <div key={index} className="role-item flex items-center gap-x-2">
                                                                <Checkbox checked={checkedPermissions.includes(item.name)} value={item.name} onChange={(e) => handleOnchange(e)} />
                                                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">{item.name}</h3>
                                                            </div>)
                                                    }

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={() => handleSave()} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">{updateLoading ? 'Saving' : 'Save'}</button>
                                <button onClick={() => closeModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default EditRoleModal

