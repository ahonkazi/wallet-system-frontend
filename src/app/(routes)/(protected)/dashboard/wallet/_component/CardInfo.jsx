"use client"
import { ButtonPrimary } from '@/components/buttons/Buttons'
import { InputField } from '@/components/input-fields/InputField'
import userApiSlice from '@/redux/features/user/userApiSlice'
import { throwError } from '@/utils/message/message'
import { isNumeric, range } from '@/utils/util'
import React, { useEffect, useState } from 'react'

const CardInfo = () => {
    const [load, { data, isLoading, isSuccess, isError, error }] = userApiSlice.useGetCardAccountMutation();
    const [create, { data: createData, isLoading: createLoading, isSuccess: createSuccess, isError: createIsError, error: createError }] = userApiSlice.useCreateCardAccountMutation();
    const [update, { data: updateData, isLoading: updateLoading, isSuccess: updateSuccess, isError: updateIsError, error: updateError }] = userApiSlice.useEditCardAccountMutation();
    const [card, setCard] = useState(null);
    const [card_number, setCardNumber] = useState('');
    const [exp_month, setExpMonth] = useState('');
    const [exp_year, setExpYear] = useState('');
    const [cvv, setCVV] = useState('');
    const [card_holder_name, setCardHolderName] = useState('');
    //create a new account
    const handleCreate = () => {
        if (card_number && exp_month && exp_year && cvv && card_holder_name) {
            if (isNumeric(exp_month) && isNumeric(exp_year)) {
                if (range(1, 12).includes(parseInt(exp_month))) {
                    if (new Date().getFullYear() < parseInt(exp_year)) {
                        create({ card_number, exp_month, exp_year, cvv, card_holder_name });
                    }
                }
            }
        }

    }
    const handleUpdate = () => {
        let newData = {};
        if (card_number) newData.card_number = card_number;
        if (exp_month && isNumeric(exp_month) && range(1, 12).includes(parseInt(exp_month))) newData.exp_month = exp_month;
        if (exp_year && isNumeric(exp_year) && new Date().getFullYear() < exp_year) newData.exp_year = exp_year;
        if (isNumeric(cvv)) newData.cvv = cvv;
        if (card_holder_name) newData.card_holder_name = card_holder_name;
        if (card) {
            update({ ...newData, id: card.id })
        }
    }
    useEffect(() => {
        load();
    }, [])
    useEffect(() => {
        if (isSuccess) {
            // console.log(data)
            setCard(data.card);
            if (data.card) {
                setCardNumber(data.card.card_number)
                setExpMonth(data.card.exp_month)
                setExpYear(data.card.exp_year)
                setCVV(data.card.cvv)
                setCardHolderName(data.card.card_holder_name)
            }

        }
    }, [isSuccess])


    let content = 'loading...'
    if (isSuccess) {
        content = <div className="inner-wrapper mt-5">
            <form>
                <div className="input-group grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                    <InputField value={card_holder_name} setValue={setCardHolderName} label={'Card Holder name'} />
                    <InputField value={card_number} setValue={setCardNumber} label={'Card number'} />
                </div>
                <div className="input-group mt-8 grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-8">
                    <InputField value={exp_month} setValue={setExpMonth} label={'Exp Month'} />
                    <InputField value={exp_year} setValue={setExpYear} label={'Exp year'} />
                    <InputField value={cvv} setValue={setCVV} label={'CVV'} />
                </div>
                <div className="flex mt-8 justify-end">
                    {
                        card ?
                            <ButtonPrimary type='button' onClick={handleUpdate}>{updateLoading ? 'Updating card Account' : 'Update'}</ButtonPrimary>
                            : <ButtonPrimary type='button' onClick={handleCreate}>{createLoading ? 'Creating card Account' : 'Add card Account'}</ButtonPrimary>
                    }
                </div>
            </form>
        </div>

    }


    useEffect(() => {
        if (createSuccess) {
            if (createData) {
                setCard(createData?.card)
                console.log(createData)
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
                setCard(updateData?.card)
                setCardNumber(updateData?.card.card_number);
                setCardHolderName(updateData?.card.card_holder_name);
                setCVV(updateData?.card.cvv);
                setExpMonth(updateData?.card.exp_month);
                setExpYear(updateData?.card.exp_year);
                throwError('success', updateData.message)

            }
            // { card_number, exp_month, exp_year, cvv, card_holder_name }
        }
        if (updateIsError) {

            if ([422, 404, 401].includes(updateError.status)) {
                throwError('error', updateError.data.message)
            }
            if (updateError.status === 404) {
                setCard(null);
            }
        }
    }, [updateLoading])

    return (
        <div>
            <div className="Wallet-wrapper mt-wrapper">
                <div className="bg-base-1 p-8">
                    <h4>Card information</h4>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default CardInfo