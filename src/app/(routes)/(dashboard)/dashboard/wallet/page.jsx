import { ButtonPrimary } from '@/components/buttons/Buttons'
import { InputField } from '@/components/input-fields/InputField'
import { DashboardTitle } from '@/components/typography/Typography'
import React from 'react'

const Wallet = () => {
    return (
        <div>
            <DashboardTitle>Your Wallet</DashboardTitle>

            <div className="Wallet-wrapper mt-wrapper">
                <div className="bg-base-1 p-8">
                    <h4>Bank account</h4>
                    <div className="inner-wrapper mt-5">
                        <form>
                            <div className="input-group grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField label={'Account name'} />
                                <InputField label={'Account number'} />
                            </div>
                            <div className="input-group mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField label={'Bank IFSC'} />
                                <InputField label={'Account Type'} />
                            </div>
                            <div className="flex mt-8 justify-end">
                                <ButtonPrimary>Add Bank Account</ButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="Wallet-wrapper mt-wrapper">
                <div className="bg-base-1 p-8">
                    <h4>Card information</h4>
                    <div className="inner-wrapper mt-5">
                        <form>
                            <div className="input-group grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField label={'Card Number'} />
                                <InputField label={'CVV'} />
                            </div>
                            <div className="input-group mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                                <InputField label={"Exp year"} />
                                <InputField label={"Exp month"} />
                            </div>

                            <div className="flex mt-8 justify-end">
                                <ButtonPrimary>Add Card</ButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet