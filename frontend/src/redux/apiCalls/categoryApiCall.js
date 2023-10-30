import request from "../../utils/request";
import { toast } from 'react-toastify'
import { categoryAction } from "../slices/categorySlice";


export function fetchCategories() {
    return async (dispatch) => {
        try {
            const { data } = await request.get("/api/categories")

            dispatch(categoryAction.setCategories(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export function createCategory(newCategory) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.post("/api/categories", newCategory, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })

            dispatch(categoryAction.addCategory(data))
            toast.success("category created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export function deleteCategory(categoryId) {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`/api/categories/${categoryId}`, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })

            dispatch(categoryAction.deleteCategory(data.categoryId))
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}