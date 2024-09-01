import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import QuestionList from './QuestionList'
import './HomeMainbar.css'
const HomeMainbar = () => {


  // var questionsList = [{
  //   _id: 1,
  //   upVotes: 3,
  //   downVotes: 3,
  //   noOfAnswers: 2,
  //   questionTitle: "What is a function",
  //   questionBody: "It meant to be",
  //   questionTags: ["java", "node js", "react js", "mongo db", "express"],
  //   userPosted: "mano",
  //   userId: 1,
  //   askedOn: "jan 1",
  //   answer: [{
  //     answerBody: 'answer',
  //     userAnswered: 'kumar',
  //     answeredOn: 'jan 2',
  //     userId: 2,
  //   }]
  // }, {
  //   _id: 2,
  //   upVotes: 0,
  //   downVotes: 3,
  //   noOfAnswers: 0,
  //   questionTitle: "what is a function",
  //   questionBody: "it meant to be",
  //   questionTags: ["javascript", "R", "python"],
  //   userPosted: "mano",
  //   userId: 1,
  //   askedOn: "jan 1",
  //   answer: [{
  //     answerBody: 'answer',
  //     userAnswered: 'kumar',
  //     answeredOn: 'jan 2',
  //     userId: 2,
  //   }]
  // }, {
  //   _id: 3,
  //   upVotes: 0,
  //   downVotes: 3,
  //   noOfAnswers: 0,
  //   questionTitle: "what is a funtion",
  //   questionBody: "It meant to be",
  //   questionTags: ["javascript", "R", "python"],
  //   userPosted: "mano",
  //   userId: 1,
  //   askedOn: "jan 1",
  //   answer: [{
  //     answerBody: 'answer',
  //     userAnswered: 'kumar',
  //     answeredOn: 'jan 2',
  //     userId: 2,
  //   }]
  // }]

  const questionsList = useSelector(state => state.questionsReducer);

  const location = useLocation();
  const user = useSelector(state => state.currentUserReducer);
  const navigate = useNavigate();
  const checkAuth = () => {
    if (user === null) {
      alert('login or signup to ask question')
      navigate('/Auth');
    } else {
      navigate('/AskQuestion');
    }
  }

  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {
          location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <button onClick={checkAuth} className='asked-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionsList.data === null ?
            <h1>Loading...</h1> :
            location.pathname === '/' ?
              <>
                <p>{questionsList.data.length} Questions</p>
                <QuestionList top={true} questionsList={questionsList.data} />
              </>
              :
              <>
                <p>{questionsList.data.length} Questions</p>
                <QuestionList top={null} questionsList={questionsList.data} />
              </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar
