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
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            })
        }),
        order: builder.mutation({
            query: ({ package_id, success_url, cancel_url }) => ({
                url: '/order',
                method: 'POST',
                body: {
                    package_id: package_id, success_url: success_url, cancel_url: cancel_url
                }
            })
        }),
        verifyOrder: builder.mutation({
            query: ({ order_id, session_id }) => ({
                url: '/verify-order',
                method: 'POST',
                body: {
                    order_id: order_id, session_id: session_id
                }
            })
        }),
    }),

})

export default userApiSlice;