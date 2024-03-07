"use client"
import userApiSlice from '@/redux/features/user/userApiSlice'
import { addUser } from '@/redux/features/user/userSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../app/app.css';

const MainLayout = ({ children }) => {
    const { data, isLoading, isSuccess, isError, error } = userApiSlice.useGetUserSettingsQuery();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user)
    useEffect(() => {
        if (isSuccess) {
            dispatch(addUser(data))
            console.log(data)
        }
        if (isError) {
            dispatch(addUser(null))
        }
    }, [isLoading])

    if (isLoading || (user.data === false)) {
        return <div className="h-full w-full p-4 fixed top-0 left-0 bg-base-1">
            <div className="bg-base-3 h-full w-full flex items-center justify-center">
                <div className="">
                    <p>Loading...</p>
                </div>
            </div>

        </div>
    }
    else return (
        <>
            {children}
        </>
    )
}

export default MainLayout