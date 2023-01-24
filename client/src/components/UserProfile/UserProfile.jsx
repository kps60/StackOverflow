import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCakeCandles, faPen } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../avatar/Avatar'
import LeftSidebar from '../leftsidebar/LeftSidebar'
import '../../App.css';
import moment from 'moment';
import EditProfileForm from './EditProfileForm';
import ProfileBio from './ProfileBio';
import './UserProfile.css'

const UserProfile = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.usersReducer)
    const currentProfile = user.filter((users) => users._id === id)[0];
    const currentUser = useSelector(state => state.currentUserReducer);
    const [Switch, setSwitch] = useState(false)
    return (

        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <section>

                    <div className="user-details-container">
                        <Avatar backgroundColor={'purple'} color={'white'} fontSize={'50px'} px={'40px'} py={'30px'}>
                            {currentProfile?.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <div className="user-name">
                            <h1>{currentProfile?.name}</h1>
                            <div className="user-name">
                                <p><FontAwesomeIcon icon={faCakeCandles} />Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result?._id === id && (
                                <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            )
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm setSwitch={setSwitch} currentUser={currentUser} />
                            ) : (
                                <ProfileBio currentProfile={currentProfile} />
                            )
                        }
                    </>

                </section>
            </div>

        </div>
    )
}

export default UserProfile
