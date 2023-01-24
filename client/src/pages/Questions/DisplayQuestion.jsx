import React from 'react'

import LeftSidebar from '../../components/leftsidebar/LeftSidebar'
import RightSidebar from '../../components/rightsidebar/RightSidebar'
import QuestionsDetails from './QuestionsDetails'
import '../../App.css'

const DisplayQuestion = () => {


    return (
        <div className='home-container-1' >
            <LeftSidebar />
            <div className="home-container-2">
                <QuestionsDetails />
                <RightSidebar />
            </div>
        </div>
    )
}

export default DisplayQuestion
