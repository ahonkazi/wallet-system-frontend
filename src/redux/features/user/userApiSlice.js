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
            query: ({ package_id, success_url, cancel_url, upgrade }) => ({
                url: upgrade ? '/upgrade-package' : '/order',
                method: 'POST',
                body: {
                    package_id: package_id, success_url: success_url, cancel_url: cancel_url
                }
            })
        }),

        verifyOrder: builder.mutation({
            query: ({ order_id, session_id, upgrade }) => ({
                url: upgrade ? '/verify-upgrade' : '/verify-order',
                method: 'POST',
                body: {
                    order_id: order_id, session_id: session_id
                }
            })
        }),
        editUserInformation: builder.mutation({
            query: ({ name, phone, gender, date_of_birth }) => ({
                url: '/basic-information',
                method: 'PATCH',
                body: { name: name, phone: phone, gender: gender, date_of_birth: date_of_birth }
            })
        }),
        getBankAccount: builder.mutation({
            query: () => ({
                url: '/wallet/bank-accounts',
                method: 'GET',
            })
        }),

        createBankAccount: builder.mutation({
            query: ({ account_number, bank_ifsc, account_type, account_name }) => ({
                url: '/wallet/bank-accounts',
                method: 'POST',
                body: { account_number, bank_ifsc, account_type, account_name }
            })
        }),
        editBankAccount: builder.mutation({
            query: ({ account_number, bank_ifsc, account_type, account_name, id }) => ({
                url: '/wallet/bank-accounts/' + id,
                method: 'PATCH',
                body: { account_number, bank_ifsc, account_type, account_name }
            })
        }),
        getCardAccount: builder.mutation({
            query: () => ({
                url: '/wallet/card-accounts',
                method: 'GET',
            })
        }),

        createCardAccount: builder.mutation({
            query: ({ card_number, exp_month, exp_year, cvv, card_holder_name }) => ({
                url: '/wallet/card-accounts',
                method: 'POST',
                body: { card_number, exp_month, exp_year, cvv, card_holder_name }
            })
        }),
        editCardAccount: builder.mutation({
            query: ({ card_number, exp_month, exp_year, cvv, card_holder_name, id }) => ({
                url: '/wallet/card-accounts/' + id,
                method: 'PATCH',
                body: { card_number, exp_month, exp_year, cvv, card_holder_name }
            })
        }),


    }),

})

export default userApiSlice;