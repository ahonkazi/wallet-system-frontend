"use client"
import { ButtonPrimary } from '@/components/buttons/Buttons'
import { InputField } from '@/components/input-fields/InputField'
import { DashboardTitle } from '@/components/typography/Typography'
import React from 'react'
import BankAccount from './_component/BankAccount'
import CardInfo from './_component/CardInfo'

const Wallet = () => {
    return (
        <div>
            <DashboardTitle>Your Wallet</DashboardTitle>
            <BankAccount />
            <CardInfo />
        </div>
    )
}

export default Wallet