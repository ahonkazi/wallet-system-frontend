"use client"
import adminApiSlice from '@/redux/features/admin/adminApiSlice';
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
const ModalAddNewPackage = ({ closeModal }) => {
    const [featureOptions, setFeaturesOptions] = useState([{ name: '' }]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discounted_price, setDiscountedPrice] = useState(0);
    const addFeature = () => {
        setFeaturesOptions((prevFeatures) => [
            ...prevFeatures,
            { name: '' },
        ]);
    };
    const handleChangeFeature = (e, i) => {
        let newFeatures = [...featureOptions];
        newFeatures[i].name = e.target.value;
        setFeaturesOptions([...newFeatures]);
    }
    // create a new packages

    const [createPackage, { data, isLoading, isError, isSuccess, error }] = adminApiSlice.useCreatePackageMutation();

    const handleCreatePackage = () => {
        if (name && price) {
            if (featureOptions.length > 0 && featureOptions[0].name !== '') {
                const validFeatures = featureOptions.filter(feature => feature.name !== '');
                createPackage({
                    name: name,
                    description: description,
                    price: price,
                    discounted_price: discounted_price,
                    features: validFeatures
                })
            }
        }
    }

    useEffect(() => {
        if (isSuccess) {
            console.log(data);
            closeModal(false);
        }
        if (isError) {
            console.log(error);
        }
    }, [isLoading])
    return (
        <div>
            <div className="fixed z-[200] bg-black bg-opacity-40  inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <AnimatePresence>
                        <motion.div transition={{ duration: 0.2, damping: 0, type: 'keyframes' }} initial={{ scale: 0.99, y: '-100px' }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.99, y: '-100px' }} className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white md:w-[500px] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="w-full mt-3  sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline"> Create a package </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500"> Enter Package name </p>
                                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" />
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500"> Enter Package description.</p>
                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"></textarea>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Price</p>
                                            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" />
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Discounted price</p>
                                            <input value={discounted_price} onChange={(e) => setDiscountedPrice(e.target.value)} type="text" className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" />
                                        </div>
                                        <div className="features mt-2">
                                            <div className="flex items-center gap-x-3">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">Package features </h3>
                                                <button onClick={addFeature} className='text-xl'>
                                                    <IoIosAddCircle />
                                                </button>
                                            </div>

                                            {
                                                featureOptions.map((item, index) =>
                                                    <div key={index} className="mt-2">
                                                        <p className="text-sm text-gray-500">Feature {index + 1}</p>
                                                        <div className="mt-2 ">
                                                            <input value={featureOptions[index].name} onChange={(e) => handleChangeFeature(e, index)} type="text" className="pr-10 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-500" />

                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleCreatePackage} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"> {isLoading ? 'Creating..' : 'Create'} </button>
                                <button onClick={() => closeModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default ModalAddNewPackage