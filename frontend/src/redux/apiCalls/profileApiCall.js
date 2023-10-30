import { profileAction } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from 'react-toastify'
import { authAction } from "../slices/authSlice";


export function getUserProfile(userId) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/api/users/profile/${userId}`)

            dispatch(profileAction.setProfile(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function uploadProfilePhoto(newPhoto) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post(`/api/users/profile/profile-photo-upload`, newPhoto, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type": "multipart/form-data"
                }
            })

            dispatch(profileAction.setProfilePhoto(data.profilePhoto))
            dispatch(authAction.setUserPhoto(data.profilePhoto))
            toast.success(data.message)

            const user = JSON.parse(localStorage.getItem("userInfo"))
            user.profilePhoto = data?.profilePhoto
            localStorage.setItem("userInfo", JSON.stringify(user))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function uploadProfile(userId, profile) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.put(`/api/users/profile/${userId}`, profile, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(profileAction.updateProfile(data))
            dispatch(authAction.setUsername(data.username))

            const user = JSON.parse(localStorage.getItem("userInfo"))
            user.username = data?.username
            localStorage.setItem("userInfo", JSON.stringify(user))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function deleteProfile(userId) {
    return async (dispatch, getState) => {
        try {
            dispatch(profileAction.setLoading())
            const { data } = await request.delete(`/api/users/profile/${userId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(profileAction.setIsProfileDeleted())
            toast.success(data?.message)
            setTimeout(() => dispatch(profileAction.clearIsProfileDeleted()), 2000)
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(profileAction.clearLoading())
        }
    }
}

export function getUsersCount() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/users/count`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(profileAction.setUserCount(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function getAllUsersProfile() {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get(`/api/users/profile`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })

            dispatch(profileAction.setProfiles(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
