import { ButtonPrimary } from '@/components/buttons/Buttons'
import { InputField } from '@/components/input-fields/InputField'
import { DashboardTitle } from '@/components/typography/Typography'
import React from 'react'

const EditProfile = () => {
    return (
        <div>
            <DashboardTitle>Edit Profile</DashboardTitle>

            <div className="EditProfile-wrapper mt-wrapper">
                <div className="bg-base-1 p-8">
                    <h4>Basic information</h4>
                    <div className="inner-wrapper mt-5">
                        <form>
                            <div className="input-group grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField label={'Your name'} />
                                <InputField label={'Phone'} />
                            </div>
                            <div className="input-group mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField label={'Gender'} />
                                <InputField label={'Date of birth'} placeholder='year-month-day' />
                            </div>
                            <div className="flex mt-8 justify-end">
                                <ButtonPrimary>Update</ButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditProfile