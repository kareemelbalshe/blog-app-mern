import { authAction } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from 'react-toastify'


export function loginUser(user) {
    return async (dispatch) => {
        try {
            // const response=await fetch("http://localhost:5005/api/auth/login",{
            //     method:"POST",
            //     body:JSON.stringify(user),
            //     headers:{
            //         "Content-Type":"application/json"
            //     }
            // })
            // const data =await response.json()

            const { data } = await request.post("/api/auth/login", user)

            dispatch(authAction.login(data))
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(authAction.logout())
        localStorage.removeItem("userInfo")
    }
}

export function registerUser(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("/api/auth/register", user)

            dispatch(authAction.register(data.message))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function verifyEmail(userId, token) {
    return async (dispatch) => {
        try {
            await request.get(`/api/auth/${userId}/verify/${token}`)

            dispatch(authAction.setIsEmailVerified())
        } catch (error) {
            console.log(error)
        }
    }
}
