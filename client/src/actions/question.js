import * as api from '../api';
import Groqans from "../pages/AskQuestions/Groqans"
export const askQuestion = (questionData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.postQuestion(questionData);
        dispatch({ type: "POST_QUESTION", payload: data });
        dispatch(fetchAllQuestions());
        navigate('/');
    } catch (error) {
        alert(error.response.data.message);
    }
}
export const askGroq = (questionData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.Questiongroq(questionData);
        <Groqans content={data?.chats?.content} />
        // dispatch({ type: "POST_QUESTION", payload: data });
        // dispatch(fetchAllQuestions());
        return data;
    } catch (error) {
        alert(error.response.data.message);
    }
}
export const fetchAllQuestions = () => async (dispatch) => {
    try {
        const { data } = await api.getAllQuestions();
        dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
    } catch (error) {
        alert(error.response.data.message);
    }
}
export const deleteQuestion = (_id, navigate, to) => async (dispatch) => {
    try {
        const data = await api.deleteQuestion(_id);
        alert(data?.message)
        dispatch(fetchAllQuestions());
        navigate(to || '/');
    } catch (error) {
        alert(error.response.data.message);
    }
}
export const voteQuestion = (id, value, userId) => async (dispatch) => {
    try {
        const data = await api.voteQuestion(id, value, userId);
        alert(data?.message)
        dispatch(fetchAllQuestions());
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const postAnswer = (answerdata) => async (dispatch) => {
    try {
        const { id, noOfAnswers, answerBody, userAnswered, userId } = answerdata;
        const { data } = await api.postAnswer(id, noOfAnswers, answerBody, userAnswered, userId)
        dispatch({ type: "POST_ANSWER", payload: data })
        dispatch(fetchAllQuestions())
    } catch (error) {
        alert(error.response.data.message);
    }
}
export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
    try {
        const data = await api.deleteAnswer(id, answerId, noOfAnswers)
        // alert(data.message);
        dispatch(fetchAllQuestions())
    } catch (error) {
        alert(error.response.data.message);
    }
}
export const deleteAdminQuestion = (_id, navigate, to) => async (dispatch) => {
    try {
        const { data } = await api.deleteAdminQuestion(_id);
        // console.log(data);
        dispatch({ type: "DELETE_QUESTION", payload: data });
        alert("Question deleted succesfully")
        // navigate(to || '/');
    } catch (error) {
        alert(error.response.data.message);
    }
}
