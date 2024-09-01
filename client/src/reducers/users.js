const usersReducer = (states = [], action) => {
    switch (action.type) {
        case "FETCH_All_USERS":
            return action.payload;
        case "UPDATE_CURRENT_USER":
            return states.map((state) => state._id === action.payload._id ? action.payload : state)
        // map returns an array states has a all the elements
        case 'DELETE_USER':
            return states.filter((user) => user._id !== action.payload._id);
        default:
            return states;
    }
}
export default usersReducer;