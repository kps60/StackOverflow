import React from 'react'

import User from './User';
import './Users.css';

const UsersList = ({ Users }) => {
    return (
        <div className='userList-container'>
            {Users !== null ?
                Users.map((user) => (
                    <User user={user} key={user?._id} />
                ))
                : <></>
            }
        </div>
    )
}

export default UsersList
