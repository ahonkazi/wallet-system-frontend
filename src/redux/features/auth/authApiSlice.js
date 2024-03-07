import { API_BASE_URL } from '@/base/base'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApiSlice = createApi({
    reducerPath: 'api/auth',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_BASE_URL}/auth`,
        headers: {
            accept: 'application/json',

        }
    }),
    endpoints: builder => ({
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/login',
                method: 'POST',
                body: { email: email, password: password }
            })
        })
    })
})

export default authApiSlice;