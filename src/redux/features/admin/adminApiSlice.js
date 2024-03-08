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
        getAllPermissions: builder.mutation({
            query: () => ({
                url: '/permissions',
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
        createRole: builder.mutation({
            query: ({ name, permissions }) => ({
                url: '/create-role',
                method: 'POST',
                body: { name, permissions }
            })
        }),
        editRole: builder.mutation({
            query: ({ name, permissions, id }) => ({
                url: '/edit-role',
                method: 'PATCH',
                body: { name, permissions, id: id }
            })
        }),
        rolePermissions: builder.mutation({
            query: (id) => ({
                url: '/permissions-by-roles',
                method: 'POST',
                body: { id: id }
            })
        }),



    })
})

export default adminApiSlice;