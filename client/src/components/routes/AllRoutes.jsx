import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AskQuestion from '../../pages/AskQuestions/AskQuestion';
import Auth from '../../pages/Auth';
import Home from '../../pages/home/Home';
import Questions from '../../pages/Questions/Questions';
import DisplayQuestion from '../../pages/Questions/DisplayQuestion';
import Tags from '../../pages/Tags/Tags';
import Users from '../../pages/Users/Users';
import UserProfile from '../UserProfile/UserProfile';


const AllRoutes = () => {
    return (
        <>
            <Route path='/' element={<Home />} />
            <Route path='/Auth' element={<Auth />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/Questions' element={<Questions />} />
            <Route path='/AskQuestion' element={<AskQuestion />} />
            <Route path='/Questions/:id' element={<DisplayQuestion />} />
            <Route path='/Tags' element={<Tags />} />
            <Route path='/Users' element={<Users />} />
            <Route path='/Users/:id' element={<UserProfile />} />
        </>
    )
}

export default AllRoutes
