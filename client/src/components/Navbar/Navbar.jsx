import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

import logo from '../../assets/logo3.png';
import search from '../../assets/search-solid.svg';
import Avatar from "../../components/avatar/Avatar";
import './Navbar.css';
import { setCurentUser } from '../../actions/currentUser';
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => (state.currentUserReducer));
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    dispatch(setCurentUser(null));
  }

  useEffect(() => {
    const token = User?.token
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurentUser(JSON.parse(localStorage.getItem('Profile'))));
  }, [dispatch]);
  return (
    <nav className='main-nav'>
      <div className="navbar">
        <Link to={'/Home'} className='nav-item nav-logo'>
          <img style={{ margin: "0 2px 0 2px", color: "black", fontWeight: "bolder", width: "10vw", height: "3vw", mixBlendMode:"color-burn", borderRadius: "10px" }} src={logo} alt="logo" />
        </Link>
        <Link to={'/'} className='nav-item nav-btn'>About</Link>
        {!User?.result?.admin === true ? <></> :
          <Link to={'/admin/stats'} className='nav-item nav-btn'>Admin</Link>
        }
        <Link to={'/Addition'} className='nav-item nav-btn'>For Teams</Link>
        <form>
          <input type="text" id='search' placeholder='Search.../' />
          <label htmlFor="search">
            <img src={search} alt="search" className='search-icon' width={'18'} />
          </label>
        </form>
        {User === null ?
          <Link to={'/Auth'} className='nav-item nav-links'>
            Log In
          </Link> : <>
            <Avatar backgroundColor="#009dff" px="10px" py="7px" color="white" borderRadius="50%" >
              <Link to={`/Users/${User?.result?._id}`} style={{ fontSize: "15px", cursor: "pointer" }}>
                {User?.result?.name?.charAt(0)?.toUpperCase()}
              </Link>
            </Avatar>
            <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
          </>
        }
      </div>
    </nav>
  )
}

export default Navbar
