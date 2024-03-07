"use client"
import { DashboardTitle } from '@/components/typography/Typography'
import React from 'react'
import { BiEdit } from "react-icons/bi";
const Permissions = () => {
    return (
        <div>
            <DashboardTitle>Permissions</DashboardTitle>
            <div className="main-wrapper">

                <section className="py-1 ">
                    <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto mt-24">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                            <div className="block w-full overflow-x-auto">
                                <table className="items-center bg-transparent w-full border-collapse ">
                                    <thead>
                                        <tr>
                                            <th className="px-6   text-blueGray-500 align-middle border border-solid border-base-3 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Name
                                            </th>

                                            <th className="px-6  text-blueGray-500 align-middle border border-solid border-base-3 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-secondary py-1.5 px-1.5 align-baseline font-sans text-[10px] font-bold uppercase leading-none text-white">
                                                    Writer
                                                </div>
                                            </th>


                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                <button className='text-xl'>
                                                    <BiEdit />
                                                </button>
                                            </td>
                                        </tr>


                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    )
}

export default Permissions