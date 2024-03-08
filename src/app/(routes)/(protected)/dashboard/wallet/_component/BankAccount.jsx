"use client"
import { ButtonPrimary } from '@/components/buttons/Buttons'
import { InputField } from '@/components/input-fields/InputField'
import userApiSlice from '@/redux/features/user/userApiSlice'
import { throwError } from '@/utils/message/message'
import React, { useEffect, useState } from 'react'

const BankAccount = () => {
    const [load, { data, isLoading, isSuccess, isError, error }] = userApiSlice.useGetBankAccountMutation();
    const [create, { data: createData, isLoading: createLoading, isSuccess: createSuccess, isError: createIsError, error: createError }] = userApiSlice.useCreateBankAccountMutation();
    const [update, { data: updateData, isLoading: updateLoading, isSuccess: updateSuccess, isError: updateIsError, error: updateError }] = userApiSlice.useEditBankAccountMutation();
    const [bank, setBank] = useState(null);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [ifsc, setIfsc] = useState('');
    const [type, setType] = useState('');
    //create a new account
    const handleCreate = () => {
        if (name && number && ifsc && type) {
            create({ account_number: number, bank_ifsc: ifsc, account_type: type, account_name: name })
        }
    }
    const handleUpdate = () => {
        let newData = {};
        if (name) newData.account_name = name;
        if (number) newData.account_number = number;
        if (ifsc) newData.bank_ifsc = ifsc;
        if (type) newData.account_type = type;
        if (bank) {
            update({ account_number: number, bank_ifsc: ifsc, account_type: type, account_name: name, id: bank.id })
        }
    }
    useEffect(() => {
        load();
    }, [])
    useEffect(() => {
        if (isSuccess) {
            setBank(data.bank);
            if (data.bank) {
                setName(data.bank.account_name);
                setNumber(data.bank.account_number);
                setIfsc(data.bank.bank_ifsc);
                setType(data.bank.account_type);
            }
        }
    }, [isSuccess])


    let content = 'loading...'
    if (isSuccess) {
        content = <div className="inner-wrapper mt-5">
            <form>
                <div className="input-group grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                    <InputField value={name} setValue={setName} label={'Account name'} />
                    <InputField value={number} setValue={setNumber} label={'Account number'} />
                </div>
                <div className="input-group mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                    <InputField value={ifsc} setValue={setIfsc} label={'Bank IFSC'} />
                    <InputField value={type} setValue={setType} label={'Account Type'} />
                </div>
                <div className="flex mt-8 justify-end">
                    {
                        bank ?
                            <ButtonPrimary type='button' onClick={handleUpdate}>{updateLoading ? 'Updating Bank Account' : 'Update'}</ButtonPrimary>
                            : <ButtonPrimary type='button' onClick={handleCreate}>{createLoading ? 'Creating Bank Account' : 'Add Bank Account'}</ButtonPrimary>
                    }
                </div>
            </form>
        </div>

    }


    useEffect(() => {
        if (createSuccess) {
            if (createData) {
                setBank(createData?.bank)
                setName(createData?.bank.account_name);
                setNumber(createData?.bank.account_number);
                setIfsc(createData?.bank.bank_ifsc);
                setType(createData?.bank.account_type);
            }
        }
        if (createIsError) {
            if (createError.status === 422) {
                throwError('error', createError.data.message)
            }
            if ([409, 401].includes(createError.status)) {
                throwError('error', createError.data.message)
            }
        }
    }, [createLoading])

    useEffect(() => {
        if (updateSuccess) {
            if (updateData) {
                setBank(updateData?.bank)
                setName(updateData?.bank.account_name);
                setNumber(updateData?.bank.account_number);
                setIfsc(updateData?.bank.bank_ifsc);
                setType(updateData?.bank.account_type);
                throwError('success', updateData.message)

            }
        }
        if (updateIsError) {

            if ([422, 404, 401].includes(updateError.status)) {
                throwError('error', updateError.data.message)
            }
            if (updateError.status === 404) {
                setBank(null);
            }
        }
    }, [updateLoading])

    return (
        <div>
            <div className="Wallet-wrapper mt-wrapper">
                <div className="bg-base-1 p-8">
                    <h4>Bank account</h4>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default BankAccount