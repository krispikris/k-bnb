// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
import { Link } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className='dropdown-button' onClick={openMenu}>
        <i className="fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>

      {showMenu && (
        <ul className="profile-dropdown">
          <li id='profile-dropdown-1-trips'>
            <Link to="/trips" className="navigation-button">
              <button id="nav-button-bold">Trips</button>
            </Link>
          </li>

          <li id='profile-dropdown-2-wishlist'>
            <Link to="/wishlists" className="navigation-button">
              <button id="nav-button-bold">Wishlists</button>
            </Link>
          </li>

          {/* SPOT CREATION: Currently a modal so create form on seperate page */}
          <li id='profile-dropdown-3-treebnb-your-home'>
            <Link to="/treebnb-your-home">
              <button id="nav-button-not-bold">Treebnb your home</button>
            </Link>
          </li>

          <li id='profile-dropdown-4-logout'>
            <button id='profile-logout-button' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
