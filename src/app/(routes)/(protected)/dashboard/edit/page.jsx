"use client"
import { ButtonPrimary } from '@/components/buttons/Buttons'
import { InputField } from '@/components/input-fields/InputField'
import { DashboardTitle } from '@/components/typography/Typography'
import userApiSlice from '@/redux/features/user/userApiSlice'
import { editUser } from '@/redux/features/user/userSlice'
import { throwError } from '@/utils/message/message'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EditProfile = () => {
    const user = useSelector(state => state.user);
    // console.log(user.data);
    const dispatch = useDispatch();
    const [name, setName] = useState(user?.data?.user.name)
    const [phone, setPhone] = useState(user?.data?.user.phone)
    const [gender, setGender] = useState(user?.data?.user.gender)
    const [date_of_birth, setDateOFBirth] = useState(user?.data?.user.date_of_birth)
    const [update, { data, isLoading, isSuccess, isError, error }] = userApiSlice.useEditUserInformationMutation();
    const handleUpdate = async () => {
        let newData = {};
        if (name) {
            newData.name = name;
        }
        if (phone) {
            newData.phone = phone;
        }
        if (gender) {
            newData.gender = gender;
        }
        if (date_of_birth) {
            newData.date_of_birth = date_of_birth;
        }
        await update(newData);
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(editUser({
                name: data.user.name,
                phone: data.user.phone,
                gender: data.user.gender,
                date_of_birth: data.user.date_of_birth,
            }))
            throwError('success', data.message)

        }
        if (isError) {
            console.log(error)
            if ([422, 401].includes(error.status)) {
                throwError('error', error.data.message)
            }
        }
    }, [isLoading])
    return (
        <div>
            <DashboardTitle>Edit Profile</DashboardTitle>

            <div className="EditProfile-wrapper mt-wrapper">
                <div className="bg-base-1 p-8">
                    <h4>Basic information</h4>
                    <div className="inner-wrapper mt-5">
                        <form >
                            <div className="input-group grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField value={name} setValue={setName} label={'Your name'} />
                                <InputField value={phone} setValue={setPhone} label={'Phone'} />
                            </div>
                            <div className="input-group mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField value={gender} setValue={setGender} label={'Gender'} />
                                <InputField value={date_of_birth} setValue={setDateOFBirth} label={'Date of birth'} placeholder='year-month-day' />
                            </div>
                            <div className="flex mt-8 justify-end">
                                <ButtonPrimary type='button' onClick={handleUpdate}>{isLoading ? 'Updating..' : 'Update'}</ButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditProfile