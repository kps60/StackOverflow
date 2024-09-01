import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import copy from 'copy-to-clipboard';

import upvote from '../../assets/upvote.svg'
import downvote from '../../assets/downvote.svg'
import Avatar from '../../components/avatar/Avatar'
import './Questions.css'
import DisplayAnswer from './DisplayAnswer'
import { deleteQuestion, postAnswer, voteQuestion } from '../../actions/question'
import jwtDecode from 'jwt-decode';

const QuestionsDetails = () => {
    const { id } = useParams();
    const questionsList = useSelector(state => state.questionsReducer);


    // var questionsList = [{
    //     _id: '1',
    //     upVotes: 3,
    //     downVotes: 3,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a function",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongo db", "express"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: 'answer',
    //         userAnswered: 'kumar',
    //         answeredOn: 'jan 2',
    //         userId: 2,
    //     }]
    // }, {
    //     _id: '2',
    //     upVotes: 0,
    //     downVotes: 3,
    //     noOfAnswers: 0,
    //     questionTitle: "what is a function",
    //     questionBody: "it meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: 'answer',
    //         userAnswered: 'kumar',
    //         answeredOn: 'jan 2',
    //         userId: 2,
    //     }]
    // }, {
    //     _id: '3',
    //     upVotes: 0,
    //     downVotes: 3,
    //     noOfAnswers: 0,
    //     questionTitle: "what is a funtion",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: 'answer',
    //         userAnswered: 'kumar',
    //         answeredOn: 'jan 2',
    //         userId: 2,
    //     }]
    // }]


    // console.log(questionsList.data.map(ques => (ques.answer)));

    const [Answer, setAnswer] = useState('');
    const User = useSelector(state => state.currentUserReducer);
    const Navigate = useNavigate();
    // console.log(User);
    // useEffect(async () => {
    //     const token = await jwtDecode(User?.token)
    //     console.log(token);
    // }, [User])
    const dispatch = useDispatch();
    const handlePostAns = (e, answerLength) => {
        e.preventDefault();
        if (User === null) {
            alert('login or signup a question');
            Navigate('/Auth');
        }
        else {

            if (Answer.length <= 10) {
                alert('Enter an answer before submitting')
            } else {
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User?.result?.name, userId: User?.result?._id }))
            }
        }
    }

    // console.log(location);
    const handleShare = () => {
        copy(window.location.href);
        alert('url has been coppied' + " " + window.location.href)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, Navigate));
    }

    const handleUpvote = () => {
        dispatch(voteQuestion(id, 'upVote', User?.result?._id))
    }
    const handleDownvote = () => {
        dispatch(voteQuestion(id, 'downVote', User?.result?._id))
    }
    return (
        <div className='question-details-page'>
            {
                questionsList.data == null ?
                    <h1>Loading...</h1> :
                    <>
                        {
                            questionsList.data.filter(question => question._id === id).map(question => (
                                <div key={question._id}>
                                    <section className='question-details-container'>
                                        <h1>{question.questionTitle}</h1>
                                        <div className='question-details-container-2'>
                                            <div className='question-votes'>
                                                <img src={upvote} alt="upvote" width={'18'} className='votes-icon' onClick={handleUpvote} />
                                                <p>{question.upVote.length - question.downVote.length}</p>
                                                <img src={downvote} alt="downvote" width={'18'} className='votes-icon' onClick={handleDownvote} />
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <p className='question-body'>{question.questionBody}</p>
                                                <div className='question-details-tags'>
                                                    {
                                                        question.questionTags.map(tag => (
                                                            <p key={tag}>{tag}</p>
                                                        ))
                                                    }
                                                </div>
                                                <div className="question-actions-user">
                                                    <div>
                                                        <button type='button' onClick={handleShare}>Share</button>
                                                        {
                                                            User?.result?._id === question?.userId && (
                                                                <button type='button' onClick={handleDelete}>Delete</button>
                                                            )
                                                        }
                                                    </div>
                                                    <div>
                                                        <p>{moment(question.askedOn).fromNow()}</p>
                                                        <Link to={`/Users/${question.userId}`} className='user-link' style={{ color: '#0086d6', }}>
                                                            <Avatar backgroundColor={'orange'} px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                            <div>
                                                                {question.userPosted}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {
                                        question.noOfAnswers !== null && (
                                            <section>
                                                <h3>{question.noOfAnswers} Answers</h3>
                                                <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                                            </section>
                                        )
                                    }
                                    <section className='post-ans-container'>
                                        <h3>Your Answer</h3>
                                        <form onSubmit={(e) => {
                                            handlePostAns(e, question.answer.length);
                                            setAnswer("");
                                        }}>
                                            <textarea id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)} value={Answer}></textarea><br />
                                            <input type="submit" className='post-ans-btn' value="Post Your Answer" />
                                        </form>
                                        <p>
                                            Browse other Question tagged
                                            {
                                                question.questionTags.map(tag => (
                                                    <Link to={'/Tags'} key={tag} className='ans-tags'> {tag} </Link>
                                                ))
                                            } or <Link to={'/AskQuestion'} style={{ textDecoration: 'none', color: '#009dff' }}> ask your own question.</Link>
                                        </p>
                                    </section>

                                </div>

                            ))
                        }
                    </>
            }
        </div>
    )
}

export default QuestionsDetails
