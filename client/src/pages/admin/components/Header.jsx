import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

import { setCurentUser } from '../../../actions/currentUser';
const Header = ({
  // toggleIsAdmin
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => (state.currentUserReducer));
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    // toggleIsAdmin()
    handleMenuClose()
    navigate('/');
    dispatch(setCurentUser(null));
  }

  const handleStats = () => {
    navigate('/admin/stats');
  }

  const handleHome = () => {
    navigate(`/Users/${User.result._id}`)
    handleMenuClose()
  }
  const handleAdminHome = () => {
    navigate(`/admin`)
    handleMenuClose()
  }
  const handleUsermange = () => {
    navigate(`/admin/users`)
    handleMenuClose()
  }
  const handlequestionmange = () => {
    navigate(`/admin/questions`)
    handleMenuClose()
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

  const isMenuOpen = Boolean(anchorEl);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="end" onClick={handleProfileMenuOpen} color="inherit">
          <AccountCircle />
        </IconButton>
        <Typography>Admin Dashboard</Typography>
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleHome}>Profile</MenuItem>
          <MenuItem onClick={handleAdminHome}>AdminHome</MenuItem>
          <MenuItem onClick={handleUsermange}>User Manage</MenuItem>
          <MenuItem onClick={handlequestionmange}>Question Manage</MenuItem>
          <MenuItem onClick={handleStats}>Statistics</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default Header