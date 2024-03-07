import { configureStore } from "@reduxjs/toolkit";
import userApiSlice from "../features/user/userApiSlice";
import userSlice from "../features/user/userSlice";
import authApiSlice from "../features/auth/authApiSlice";
import adminApiSlice from "../features/admin/adminApiSlice";
import publicApiSlice from "../features/public/publicApiSlice";

export const store = configureStore({
    reducer: {
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [adminApiSlice.reducerPath]: adminApiSlice.reducer,
        [publicApiSlice.reducerPath]: publicApiSlice.reducer,
        user: userSlice,
    }, middleware: (defaultMiddleware => {
        return defaultMiddleware().concat([
            userApiSlice.middleware,
            authApiSlice.middleware,
            adminApiSlice.middleware,
            publicApiSlice.middleware,
        ])
    })

})