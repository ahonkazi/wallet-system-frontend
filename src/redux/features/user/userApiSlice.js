import { API_BASE_URL } from '@/base/base'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'

const userApiSlice = createApi({
    reducerPath: 'api/user',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/user`,
        headers: {
            Authorization: 'Bearer ' + getCookie('token'),
            Accept: 'application/json'
        }
    }),
    endpoints: builder => ({
        getUserSettings: builder.query({
            query: () => '/settings'
        })
    })
})

export default userApiSlice;