"use client"
import { ButtonPrimary } from '@/components/buttons/Buttons'
import { InputField } from '@/components/input-fields/InputField'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="">
            <div className='app-container mt-page'>
                <div className="flex justify-center">
                    <div className="bg-base-1 p-6 rounded shadow-xl w-full sm:w-[80%] md:w-[450px]">
                        <div className="flex items-center justify-center gap-x-2">
                            <h5>Create a new account</h5>
                        </div>
                        <form action="" className='mt-4 flex gap-y-5 flex-col'>

                            <InputField label={'You name'} />
                            <InputField label={'You Email'} />
                            <InputField label={'You Password'} />

                            <div className="input-item">
                                <ButtonPrimary fullwidth={true}>Create account</ButtonPrimary>
                            </div>
                            <div className="form-footer">
                                <div className="input-item flex gap-x-2">
                                    <span>Already have an account?</span>
                                    <Link href={'/login'} className='text-info underline'>Login here</Link>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>)
}

export default page