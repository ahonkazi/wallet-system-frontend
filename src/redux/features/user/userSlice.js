const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    data: false
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.data = action.payload
        },
        editUser: (state, action) => {
            if (state.data) {
                state.data.user.name = action.payload.name;
                state.data.user.phone = action.payload.phone;
                state.data.user.gender = action.payload.gender;
                state.data.user.date_of_birth = action.payload.date_of_birth;
            }
        },
    }
})

export default userSlice.reducer;
export const { addUser, editUser } = userSlice.actions;