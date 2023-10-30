import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: []
    },
    reducers: {
        setComments(state, action) {
            state.comments = action.payload
        },
        deleteComments(state, action) {
            state.comments = state.comments.filter(c => c._id !== action.payload)
        },
    }
})
export const commentReducer = commentSlice.reducer
export const commentAction = commentSlice.actions