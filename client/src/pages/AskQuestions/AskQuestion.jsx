import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { askGroq, askQuestion } from '../../actions/question'
import Groqans from "./Groqans"
import './AskQuestion.css'

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState('');
    const [questionTags, setQuestionTags] = useState('');
    const [Groqan, setGroqans] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state) => (state.currentUserReducer));
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log({ questionTitle, questionBody, questionTags });
        dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id }, navigate));
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setQuestionBody(questionBody + "/n")
        }
    }
    const handleGroqReview = async () => {
        const gq = await dispatch(askGroq({ questionTitle, questionBody, questionTags }))
        setGroqans(gq?.chats?.content)
    }
    useEffect(() => {
        if (User === null) {
            Error('login or signup to ask question')
            navigate('/Auth');
        }
    }, [])
    return (
        <div className='ask-question'>
            <div className="ask-ques-container">
                <h1>Ask a public Question </h1>
                <form onSubmit={handleSubmit}>
                    <div className='ask-form-container'>
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you're asking a question to another person.</p>
                            <input type="text" placeholder='e.g.Is there an R funtion for finding the index of an element in a vector?' id="ask-ques-title" onChange={(e) => setQuestionTitle(e.target.value)} />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>What is the details of your problem?</h4>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea id="ask-ques-body" cols="30" rows="10" onChange={(e) => setQuestionBody(e.target.value)}></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add up to 5 tags with spaces to discribe what your question is about</p>
                            <input type="text" placeholder="e.g.(xml typescript wordpress)" onKeyPress={handleEnter} id="ask-ques-tags" onChange={(e) => setQuestionTags(e.target.value.split(" "))} />
                        </label>
                    </div>
                    <input type="submit" value="Review your question" className='review-btn' />
                    <input type="button" onClick={handleGroqReview} value="Review With Groq" className='review-btn' />
                </form>
                {/* <>
                    {Groqans}
                </> */}
                {Groqan?.length >= 15 && <Groqans content={Groqan} />}
            </div>
        </div >
    )
}

export default AskQuestion
