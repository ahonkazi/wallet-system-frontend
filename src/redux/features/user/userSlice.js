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
        }
    }
})

export default userSlice.reducer;
export const { addUser } = userSlice.actions;