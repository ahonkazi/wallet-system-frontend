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
        getAllUsers: builder.mutation({
            query: () => ({
                url: '/users',
                method: 'GET',
            })
        }),
        getAllRoles: builder.mutation({
            query: () => ({
                url: '/roles',
                method: 'GET',
            })
        }),
        assignRoles: builder.mutation({
            query: ({ user_id, role_names }) => ({
                url: '/assign-role',
                method: 'POST',
                body: { user_id, role_names }
            })
        }),



    })
})

export default adminApiSlice;