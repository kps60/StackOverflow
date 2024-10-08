import axios from 'axios';
const API = axios.create({ baseURL: 'https://stackoverflow-backend-hkb1.onrender.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('Profile')) {
        req.headers.authorisation = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
    }
    return req;
});

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup', authData);
// export const auth = (authdata) => API.post('/user/admin', authdata)

export const getAllQuestions = () => API.get('/questions/get');
export const postQuestion = (questionData) => API.post('/questions/Ask', questionData);
export const Questiongroq = (message) => API.post('/questions/Askgroq', message);
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, { value, userId });

export const deleteAdminQuestion = (id) => API.delete(`/questions/admin/delete/${id}`);

export const postAnswer = (id, noOfAnswer, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { noOfAnswer, answerBody, userAnswered, userId });
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const deleteAdminAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const fetchAllUsers = () => API.get('/user/getAllUsers');
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData);
export const deleteProfile = (id) => API.delete(`/user/admin/${id}`);

