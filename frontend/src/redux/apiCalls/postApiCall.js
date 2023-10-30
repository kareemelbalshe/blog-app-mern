import request from "../../utils/request";
import { toast } from 'react-toastify'
import { postAction } from "../slices/postSlice";


export function fetchPosts(pageNumber) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`)

            dispatch(postAction.setPosts(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function getPostCount() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/count`)

            dispatch(postAction.setPostsCount(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function fetchPostsBasedOnCategory(category) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts?category=${category}`)

            dispatch(postAction.setPostsCata(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function createPost(newPost) {
    return async (dispatch, getState) => {
        try {
            dispatch(postAction.setLoading())
            await request.post(`/api/posts`, newPost, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            })

            dispatch(postAction.setIsPostCreated())
            setTimeout(() => dispatch(postAction.clearIsPostCreated()), 2000)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(postAction.clearLoading())
        }
    }
}

export function fetchSinglePost(postId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts/${postId}`)

            dispatch(postAction.setPost(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function toggleLikePost(postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/posts/like/${postId}`, {}, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(postAction.setLike(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function updatePostImage(newImage, postId) {
    return async (dispatch, getState) => {
        try {
            await request.put(`/api/posts/update-image/${postId}`, newImage, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            })
            toast.success("New post image updated successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function updatePost(newPost, postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/posts/${postId}`, newPost, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(postAction.setPost(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function deletePost(postId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/posts/${postId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(postAction.deletePost(data.postId))
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function getAllPosts() {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/posts`)

            dispatch(postAction.setPosts(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}