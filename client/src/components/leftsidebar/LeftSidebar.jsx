import React from 'react'
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom';
import Globe from '../../assets/Globe.svg';

const LeftSidebar = () => {
  const classNameFunc = ({ isActive }) => (isActive ? "active" : "");
  return (
    <div className='left-sidebar'>
      <nav className="side-nav">
        {/* "activeClassName" is no longer a property of NavLink. Instead you can use either
      style or className to apply your "isActive". Save this answer */}
        <NavLink to={'/'} className={`side-nav-links ${classNameFunc}`}>
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div><p>PUBLIC</p></div>
          <NavLink to={'/Questions'} className={`side-nav-links ${classNameFunc}`} >
            <img src={Globe} alt="Globe" />
            <p style={{ paddingLeft: '10px' }}> Questions </p>
          </NavLink>
          <NavLink to={'/Tags'} className={`side-nav-links ${classNameFunc}`} style={{paddingLeft:'40px' }}>
            <p>Tags</p>
          </NavLink>
          <NavLink to={'/Users'} className={`side-nav-links ${classNameFunc}`} style={{paddingLeft:'40px' }}>
            <p>Users</p>
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

export default LeftSidebar
