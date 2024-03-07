import { ButtonPrimary } from '@/components/buttons/Buttons'
import Header from '@/components/header/Header'
import { InputField } from '@/components/input-fields/InputField'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
    return (
        <div className="">
            <div className='app-container mt-page'>
                <div className="flex justify-center">
                    <div className="bg-base-1 p-6 rounded shadow-xl w-full sm:w-[80%] md:w-[450px]">
                        <div className="flex items-center justify-center gap-x-2">
                            <h5>Welcome back</h5>
                        </div>
                        <form action="" className='mt-4 flex gap-y-5 flex-col'>

                            <InputField label={'Your Email'} />
                            <InputField label={'Your Password'} />

                            <div className="input-item">
                                <ButtonPrimary fullwidth={true}>Login</ButtonPrimary>
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