const questionsReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case "POST_QUESTION":
            return { ...state };
        case "POST_ANSWER":
            return { ...state };
        case "FETCH_ALL_QUESTIONS":
            return { ...state, data: action.payload };
        case 'DELETE_QUESTION':
            return {...state.data.filter((ques) => ques._id !== action.payload._id)};
        default:
            return state;
    }
}
export default questionsReducer;