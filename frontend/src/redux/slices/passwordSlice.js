import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
    name: "category",
    initialState: {
        isError: false
    },
    reducers: {
        setError(state) {
            state.isError = true
        },
    }
})
export const passwordReducer = passwordSlice.reducer
export const passwordAction = passwordSlice.actions