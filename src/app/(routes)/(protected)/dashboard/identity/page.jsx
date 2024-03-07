"use client"
import { ButtonPrimary } from '@/components/buttons/Buttons'
import { InputField } from '@/components/input-fields/InputField'
import { DashboardTitle } from '@/components/typography/Typography'
import React from 'react'

const Identity = () => {
    return (
        <div>
            <DashboardTitle>Your Identity</DashboardTitle>

            <div className="identity-wrapper mt-wrapper">
                <div className="bg-base-1 p-8">
                    <h4>Passport</h4>
                    <div className="inner-wrapper mt-5">
                        <form>
                            <div className="input-group grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField label={'Passport holder name'} />
                                <InputField label={'Passport number'} />
                            </div>
                            <div className="input-group mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField label={'Passport issuing country'} />
                                <InputField label={'Expire date'} placeholder='year-month-day' />
                            </div>
                            <div className="flex mt-8 justify-end">
                                <ButtonPrimary>Add passport</ButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="identity-wrapper mt-wrapper">
                <div className="bg-base-1 p-8">
                    <h4>NID</h4>
                    <div className="inner-wrapper mt-5">
                        <form>
                            <div className="input-group grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField label={'Name'} />
                                <InputField label={'NID Number'} />
                            </div>
                            <div className="input-group mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField label={"Father's name"} />
                                <InputField label={"Mother's name"} />
                            </div>
                            <div className="input-group mt-8 grid grid-cols-1  gap-y-8 gap-x-8">
                                <InputField label={'Date of birth'} placeholder='year-month-day' />
                            </div>
                            <div className="flex mt-8 justify-end">
                                <ButtonPrimary>Add NID</ButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Identity