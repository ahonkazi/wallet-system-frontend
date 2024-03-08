"use client"
import userApiSlice from '@/redux/features/user/userApiSlice'
import { addUser } from '@/redux/features/user/userSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../app/app.css';
import { LoadingPage } from '@/components/skeleton/Loading'

const MainLayout = ({ children }) => {
    const { data, isLoading, isSuccess, isError, error } = userApiSlice.useGetUserSettingsQuery();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user)
    useEffect(() => {
        if (isSuccess) {
            dispatch(addUser(data))
        }
        if (isError) {
            dispatch(addUser(null))
        }
    }, [isLoading])

    if (isLoading || (user.data === false)) {
        return <LoadingPage />
    }
    else return (
        <>
            {children}
        </>
    )
}

export default MainLayout