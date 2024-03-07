import { configureStore } from "@reduxjs/toolkit";
import userApiSlice from "../features/user/userApiSlice";
import userSlice from "../features/user/userSlice";
import authApiSlice from "../features/auth/authApiSlice";

export const store = configureStore({
    reducer: {
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        user: userSlice,
    }, middleware: (defaultMiddleware => {
        return defaultMiddleware().concat([userApiSlice.middleware, authApiSlice.middleware])
    })

})