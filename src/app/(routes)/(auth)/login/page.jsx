"use client"
import { ButtonPrimary } from '@/components/buttons/Buttons'
import { InputField } from '@/components/input-fields/InputField'
import authApiSlice from '@/redux/features/auth/authApiSlice'
import { throwError } from '@/utils/message/message'
import { getCookie, setCookie } from 'cookies-next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, { data, isLoading, isSuccess, isError, error }] = authApiSlice.useLoginMutation();
    const LoginHandle = () => {
        if (email && password) {
            login({ email: email, password: password })
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setCookie('token', data.token, { maxAge: 60 * 60 * 12 * 7 });
            if (typeof location !== 'undefined') {
                if (getCookie('last_url')) {
                    location.replace(getCookie('last_url'))
                } else {
                    location.replace('/dashboard')

                }
            }
        }
        if (isError) {
            if (error.status === 422) {
                // console.log(error.data.errors.email)
                if (error.data.errors.email) {
                    throwError('error', error.data.errors.email[0])
                }
                if (error.data.errors.password) {
                    throwError('error', error.data.errors.password[0])
                }
            }
            if ((error.status === 404) || (error.status === 401)) {
                if (error.data.message) {
                    throwError('error', error.data.message)
                }

            }

        }
    }, [isLoading])
    return (
        <div className="">
            <div className='app-container mt-page'>
                <div className="flex justify-center">
                    <div className="bg-base-1 p-6 rounded shadow-xl w-full sm:w-[80%] md:w-[450px]">
                        <div className="flex items-center justify-center gap-x-2">
                            <h5>Welcome back</h5>
                        </div>
                        <form action="" className='mt-4 flex gap-y-5 flex-col'>
                            <InputField type='text' value={email} setValue={setEmail} label={'Your Email'} />
                            <InputField type='password' value={password} setValue={setPassword} label={'Your Password'} />

                            <div className="input-item">
                                <ButtonPrimary disabled={isLoading} type="button" onClick={() => LoginHandle()} fullwidth={true}>{isLoading ? 'Loading...' : 'Login'}</ButtonPrimary>
                            </div>
                            <div className="form-footer">
                                <div className="input-item flex gap-x-2">
                                    <span>Don&apos; have an account?</span>
                                    <Link href={'/signup'} className='text-info underline'>Signup here</Link>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginPage