import React, { useEffect, useState } from 'react'
import Questions from './Questions'
const QuestionList = ({ questionsList, top }) => {
    const [QuestionsList, setQuestionsList] = useState(questionsList);
    useEffect(() => {
        if (top) {
            const sortedObjects = questionsList.sort((a, b) => (a.upVote.length - a.downVote.length) < (b.upVote.length - b.downVote.length) ? 1 : -1)
            setQuestionsList(sortedObjects);
        }
    }, [top]);
    return (
        <div>
            {
                QuestionsList.map(question => (<Questions question={question} key={question._id} />))
            }
        </div>
    )
}

export default QuestionList
