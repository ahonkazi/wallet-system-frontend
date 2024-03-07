import { API_BASE_URL } from '@/base/base'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next';

const adminApiSlice = createApi({
    reducerPath: 'api/admin',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/admin`,
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
            Accept: 'application/json'
        }
    }),
    endpoints: builder => ({
        createPackage: builder.mutation({
            query: (data) => ({
                url: '/package',
                method: 'POST',
                body: data
            })
        }),



    })
})

export default adminApiSlice;