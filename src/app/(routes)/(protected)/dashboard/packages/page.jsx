"use client"
import { ButtonPrimary } from '@/components/buttons/Buttons'
import { PackageCard } from '@/components/cards/PackageCard'
import ModalAddNewPackage from '@/components/modals/ModalAddNewPackage'
import React, { useState } from 'react'
import PackageList from './PackageList'
import { useSelector } from 'react-redux'

const Packages = () => {
    const [openModal, setOpenModal] = useState(false);
    const user = useSelector(state => state.user)
    const permission_to_create = user.data?.permissions?.includes('package-create');
    return (
        <div>
            {openModal && (<ModalAddNewPackage closeModal={setOpenModal} />)}
            <div className="section-title flex justify-between items-center">
                <p className='font-base-2'>Packages</p>
                {
                    permission_to_create && (
                        <div className="">
                            <ButtonPrimary onClick={() => setOpenModal(true)}>Add new package</ButtonPrimary>
                        </div>
                    )
                }

            </div>
            <PackageList />
        </div>
    )
}

export default Packages