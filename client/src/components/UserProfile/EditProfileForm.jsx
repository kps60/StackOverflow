import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../actions/users'
import './UserProfile.css'

const EditProkfileForm = ({ setSwitch, currentUser }) => {
    const [name, setName] = useState(currentUser?.result?.name)
    const [about, setAbout] = useState(currentUser?.result?.about)
    const [tags, setTags] = useState(currentUser?.result?.tags)
    useEffect(() => {
        setTags(currentUser?.result?.tags)
        setAbout(currentUser?.result?.about)
        setName(currentUser?.result?.name)
    }, [currentUser])
    const dispatch = useDispatch();
    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: tags }))
        setSwitch(false);
    }
    return (
        <div>
            <h1 className='edit-profile-title'>Edit Your Profile</h1>
            <h2 className='edit-profile-title-2'>Public information</h2>
            <form onSubmit={handleEdit} className='edit-profile-form' >
                <label htmlFor="name">
                    <h3>Display name</h3>
                    <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label htmlFor="about">
                    <h3>About</h3>
                    <textarea type="text" cols={'30'} rows='10' id='about' value={about} onChange={(e) => setAbout(e.target.value)} ></textarea>
                </label>
                <label htmlFor="tags">
                    <h3>Tags</h3>
                    <p>Add tags sapparated by 1 space</p>
                    <input type="text" id='tags' value={tags.join(' ')} onChange={(e) => setTags(e.target.value.split(" "))} />
                </label><br />
                <input type="submit" value='Save Profile' className='user-submit-btn' />
                <input type="button" value="Cancel" className='user-cancel-btn' onClick={() => setSwitch(false)} />
            </form>
        </div>
    )
}

export default EditProkfileForm
