import React from 'react'
import { useSelector } from 'react-redux'

import LeftSidebar from '../../components/leftsidebar/LeftSidebar'
import '../../App.css';
import UsersList from './UsersList';

const Users = () => {
  const Users = useSelector((state) => (state.usersReducer));
  return (
    <div className='home-container-1' >
      <LeftSidebar />
      <div className="home-container-2" style={{marginTop:'30px'}}>
        <h1 style={{fontWeight:'400'}}>Users</h1>
        <UsersList Users={Users} />
      </div>
    </div>
  )
}

export default Users
