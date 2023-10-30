import request from "../../utils/request";
import { toast } from 'react-toastify'
// import { commentAction } from "../slices/commentSlice";
import { postAction } from "../slices/postSlice";
import { commentAction } from "../slices/commentSlice";

export function createComment(newComment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/api/comments", newComment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(postAction.addCommentToPost(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function updateComment(commentId, comment) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/comments/${commentId}`, comment, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(postAction.updateCommentPost(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function deleteComment(commentId) {
    return async (dispatch, getState) => {
        try {
            await request.delete(`/api/comments/${commentId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(commentAction.deleteComments(commentId))
            dispatch(postAction.deleteCommentFromPost(commentId))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function featchAllComments() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/comments`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(commentAction.setComments(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}