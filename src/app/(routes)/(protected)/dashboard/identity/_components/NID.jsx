"use client"
import { ButtonPrimary } from '@/components/buttons/Buttons'
import { InputField } from '@/components/input-fields/InputField'
import userApiSlice from '@/redux/features/user/userApiSlice'
import { throwError } from '@/utils/message/message'
import { isNumeric, range } from '@/utils/util'
import React, { useEffect, useRef, useState } from 'react'
import { LuDownload } from 'react-icons/lu';
import html2pdf from 'html2pdf.js'
import { nidCard } from '@/components/designs/cards'

const CardInfo = () => {
    const [load, { data, isLoading, isSuccess, isError, error }] = userApiSlice.useGetNidInformationMutation();
    const [create, { data: createData, isLoading: createLoading, isSuccess: createSuccess, isError: createIsError, error: createError }] = userApiSlice.useCreateNIDInformationMutation();
    const [update, { data: updateData, isLoading: updateLoading, isSuccess: updateSuccess, isError: updateIsError, error: updateError }] = userApiSlice.useEditNIDInformationMutation();
    const [nid, setNID] = useState(null);
    const [name, setName] = useState('');
    const [father_name, setFatherName] = useState('');
    const [mother_name, setMotherName] = useState('');
    const [date_of_birth, setDateOfBirth] = useState('');
    const [nid_number, setNIDNumber] = useState('');
    const options = {
        filename: 'my-nid.pdf',
        margin: 1,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    const contentRef = useRef(null);

    const convertToPdf = () => {
        const content = nidCard({ name, father_name, mother_name, nid_number, date_of_birth });
        if (nid) {
            html2pdf().set(options).from(content).save();
        }
    };
    //create a new account
    const handleCreate = () => {
        if (name && father_name && mother_name && date_of_birth && nid_number) {
            if (isNumeric(nid_number)) {
                create({ name, father_name, mother_name, date_of_birth, nid_number });
            }
        }

    }
    const handleUpdate = () => {
        let newData = {};
        if (name) newData.name = name;
        if (father_name) newData.father_name = father_name;
        if (mother_name) newData.mother_name = mother_name;
        if (date_of_birth) newData.date_of_birth = date_of_birth;
        if (isNumeric(nid_number)) newData.nid_number = nid_number;
        if (nid) {
            update({ ...newData, id: nid.id })
        }
    }
    useEffect(() => {
        load();
    }, [])
    useEffect(() => {
        if (isSuccess) {
            // console.log(data)
            setNID(data.nid);
            if (data.nid) {
                setNIDNumber(data.nid.nid_number)
                setName(data.nid.name)
                setFatherName(data.nid.father_name)
                setMotherName(data.nid.mother_name)
                setDateOfBirth(data.nid.date_of_birth)

            }

        }
    }, [isSuccess])


    let content = 'loading...'
    if (isSuccess) {
        content = <div ref={contentRef} className="inner-wrapper mt-5">
            <form>
                <div className="">
                    <div className="input-group grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                        <InputField value={name} setValue={setName} label={'Your name'} />
                        <InputField value={nid_number} setValue={setNIDNumber} label={'NID number'} />
                    </div>
                    <div className="input-group mt-8 grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-8">
                        <InputField value={father_name} setValue={setFatherName} label={"Father's name"} />
                        <InputField value={mother_name} setValue={setMotherName} label={"Mother's name"} />
                        <InputField value={date_of_birth} setValue={setDateOfBirth} placeholder='year-month-day' label={'Date of birth'} />
                    </div>
                </div>
                <div className="flex mt-8 justify-end">
                    {
                        nid ?
                            <ButtonPrimary type='button' onClick={handleUpdate}>{updateLoading ? 'Updating NID information' : 'Update'}</ButtonPrimary>
                            : <ButtonPrimary type='button' onClick={handleCreate}>{createLoading ? 'Creating nid Account' : 'Add nid Information'}</ButtonPrimary>
                    }
                </div>
            </form>
        </div>

    }


    useEffect(() => {
        if (createSuccess) {
            if (createData) {
                setNID(createData?.nid)
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
                setNID(updateData?.nid)
                setNIDNumber(updateData.nid.nid_number)
                setName(updateData.nid.name)
                setFatherName(updateData.nid.father_name)
                setMotherName(updateData.nid.mother_name)
                setDateOfBirth(updateData.nid.date_of_birth)

                throwError('success', updateData.message)

            }
            // { card_number, exp_month, exp_year, cvv, card_holder_name }
        }
        if (updateIsError) {

            if ([422, 404, 401].includes(updateError.status)) {
                throwError('error', updateError.data.message)
            }
            if (updateError.status === 404) {
                setNID(null);
            }
        }
    }, [updateLoading])

    return (
        <div>
            <div className="Wallet-wrapper mt-wrapper">
                <div className="bg-base-1 p-8">
                    <div className="flex items-center gap-x-4">
                        <h4>NID information</h4>
                        <button onClick={convertToPdf} className='text-xl text-dark'><LuDownload /></button>
                    </div>
                    <div className="">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardInfo