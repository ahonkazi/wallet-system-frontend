"use client"
import { ButtonPrimary } from '@/components/buttons/Buttons'
import { InputField } from '@/components/input-fields/InputField'
import userApiSlice from '@/redux/features/user/userApiSlice'
import { throwError } from '@/utils/message/message'
import { isNumeric, range } from '@/utils/util'
import React, { useEffect, useState } from 'react'
// passport_number, exp_date, country
const PassportInfo = () => {
    const [load, { data, isLoading, isSuccess, isError, error }] = userApiSlice.useGetPassportInformationMutation();
    const [create, { data: createData, isLoading: createLoading, isSuccess: createSuccess, isError: createIsError, error: createError }] = userApiSlice.useCreatePassportInformationMutation();
    const [update, { data: updateData, isLoading: updateLoading, isSuccess: updateSuccess, isError: updateIsError, error: updateError }] = userApiSlice.useEditPassportInformationMutation();
    const [passport, setPassport] = useState(null);
    const [passport_number, setPassportNumber] = useState('');
    const [exp_date, setExpDate] = useState('');
    const [country, setCountry] = useState('');
    //create a new account
    const handleCreate = () => {
        if (passport_number && exp_date && country) {
            if (isNumeric(passport_number)) {
                create({ passport_number, exp_date, country });
            }
        }

    }
    const handleUpdate = () => {
        let newData = {};
        if (country) newData.country = country;
        if (exp_date) newData.exp_date = exp_date;
        if (isNumeric(passport_number)) newData.passport_number = passport_number;
        if (passport) {
            update({ ...newData, id: passport.id })
        }
    }
    useEffect(() => {
        load();
    }, [])
    useEffect(() => {
        if (isSuccess) {
            // console.log(data)
            setPassport(data.passport);
            if (data.passport) {
                setPassportNumber(data.passport.passport_number)
                setCountry(data.passport.country)
                setExpDate(data.passport.exp_date)
            }

        }
    }, [isSuccess])


    let content = 'loading...'
    if (isSuccess) {
        content = <div className="inner-wrapper mt-5">
            <form>
                <div className="input-group grid grid-cols-1 gap-y-8 gap-x-8">
                    <InputField value={passport_number} setValue={setPassportNumber} label={'Passport number'} />
                </div>
                <div className="input-group mt-8 grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-8">
                    <InputField value={country} setValue={setCountry} label={"Passport issuing country"} />
                    <InputField value={exp_date} setValue={setExpDate} placeholder='year-month-day' label={'Exp date'} />
                </div>
                <div className="flex mt-8 justify-end">
                    {
                        passport ?
                            <ButtonPrimary type='button' onClick={handleUpdate}>{updateLoading ? 'Updating passport information' : 'Update'}</ButtonPrimary>
                            : <ButtonPrimary type='button' onClick={handleCreate}>{createLoading ? 'Creating passport information' : 'Add Passport Information'}</ButtonPrimary>
                    }
                </div>
            </form>
        </div>

    }


    useEffect(() => {
        if (createSuccess) {
            if (createData) {
                setPassport(createData?.passport)
                setPassportNumber(createData.passport.passport_number)
                setCountry(createData.passport.country)
                setExpDate(createData.passport.exp_date)
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
                setPassport(updateData?.passport)
                setPassportNumber(updateData.passport.passport_number)
                setCountry(updateData.passport.country)
                setExpDate(updateData.passport.exp_date)
                throwError('success', updateData.message)
            }
            // { card_number, exp_month, exp_year, cvv, card_holder_name }
        }
        if (updateIsError) {

            if ([422, 404, 401].includes(updateError.status)) {
                throwError('error', updateError.data.message)
            }
            if (updateError.status === 404) {
                setPassport(null);
            }
        }
    }, [updateLoading])

    return (
        <div>
            <div className="Wallet-wrapper mt-wrapper">
                <div className="bg-base-1 p-8">
                    <h4>Passport information</h4>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default PassportInfo