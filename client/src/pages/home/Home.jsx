import React from 'react';

import '../../App.css';
import LeftSidebar from '../../components/leftsidebar/LeftSidebar';
import HomeMainbar from '../../components/homemainbar/HomeMainbar';
import RightSidebar from '../../components/rightsidebar/RightSidebar';

const Home = () => {
    return (
        <div className='home-container-1' >
            <LeftSidebar />
            <div className="home-container-2">
                <HomeMainbar />
                <RightSidebar />
            </div>
        </div>
    )
}

export default Home
