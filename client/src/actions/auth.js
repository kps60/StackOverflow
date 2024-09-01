import * as api from '../api'
import { setCurentUser } from './currentUser'

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        // if (data && data.respose && data?.response.status !== 200) {
        //     alert(data.data.message + " ")
        //     navigate('/auth')
        // }
        dispatch({ type: 'AUTH', data });
        dispatch(setCurentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/');

    } catch (error) {
        alert(error.response.data.message);
    }
}
export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData)
        // if (data && data.respose && data?.response.status !== 200) {
        //     alert(data.response.data.message + " ")
        // }
        dispatch({ type: 'AUTH', data });
        dispatch(setCurentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/');

    } catch (error) {
        alert(error.response.data.message);
    }
}
// export const auth = (authdata, navigate) => async (dispatch) => {
//     try {
//         const { data } = await api.auth(authdata)
//         console.log(data)
//         // if (data && data.respose && data?.response.status !== 200) {
//         //     alert(data.response.data.message + " ")
//         //     navigate('/admin/auth')
//         // }
//         dispatch({ type: 'AUTH', data })
//         dispatch(setCurentUser(JSON.parse(localStorage.getItem('Profile'))))
//         navigate('/admin')

//     } catch (error) {
//         alert(error.message + " " + error.status)
//     }
// }