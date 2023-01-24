export const setCurentUser = (data) => {
    return {
        type: 'FETCH_CURRENT_USER',
        payload: data
    }
}