import * as api from '../api'

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllUsers();
        dispatch({ type: "FETCH_All_USERS", payload: data });
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = (id, updataData) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, updataData)
        dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
    } catch (error) {
        alert(error.response.data.message);
    }
}
export const deleteProfile = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteProfile(id);
        dispatch({ type: "DELETE_USER", payload: data });
        alert("User deleted Successfully with all questions created with answers")
    } catch (error) {
        alert(error.response.data.message);
    }
}