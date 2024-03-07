import { API_BASE_URL } from '@/base/base'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next';

const publicApiSlice = createApi({
    reducerPath: 'api/public',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/public`,
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
            Accept: 'application/json'
        }
    }),
    endpoints: builder => ({
        getPackages: builder.query({
            query: () => ({
                url: '/packages',
            })
        })
    })
})

export default publicApiSlice;