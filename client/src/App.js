import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Admin from "./pages/admin/Admin"
import Header from "./pages/admin/components/Header"
import Auth from "./pages/Auth"
import QuestionManagement from './pages/admin/QuestionManagement';
import Home from './pages/home/Home';
import Questions from './pages/Questions/Questions';
import AskQuestion from './pages/AskQuestions/AskQuestion';
import DisplayQuestion from './pages/Questions/DisplayQuestion';
import Tags from './pages/Tags/Tags';
import Users from './pages/Users/Users';
import UserProfile from './components/UserProfile/UserProfile';
import NotFound from './NotFound';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
import UserManagement from './pages/admin/UserManagement';
function App() {

  const dispatch = useDispatch();
  const User = useSelector((state) => (state.currentUserReducer));
  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch])
  return (
    <Router>
      {User?.result?.admin === true ? <Header
      /> :
        <Navbar />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Auth' element={<Auth />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Questions' element={<Questions />} />
        <Route path='/AskQuestion' element={<AskQuestion />} />
        <Route path='/Questions/:id' element={<DisplayQuestion />} />
        <Route path='/Tags' element={<Tags />} />
        <Route path='/Users' element={<Users />} />
        <Route path='/Users/:id' element={<UserProfile />} />
        
        {User?.result?.admin === true &&
          <Route path="/admin" element={<Admin />} />}
        {User?.result?.admin === true &&
          <Route path="/admin/questions" element={<QuestionManagement />} />}
        {User?.result?.admin === true &&
          <Route path="/admin/users" element={<UserManagement />} />}
        {User?.result?.admin === true &&
          <Route path="/admin/stats" element={<QuestionManagement />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
