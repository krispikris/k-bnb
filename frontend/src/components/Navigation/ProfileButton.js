// frontend/src/components/Navigation/ProfileButton.js
import    React, { useState, useEffect }    from 'react';
import  { useDispatch }                     from 'react-redux';
import    * as sessionActions               from '../../store/session';
import                                           './ProfileButton.css'

function ProfileButton({ user }) {
  const   dispatch                  = useDispatch();
  const [ showMenu, setShowMenu ]   = useState(false);

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
        <div className="profile-dropdown">
          <div id='profile-dropdown-1'>Welcome back to Treebnb, {user.firstName}!</div>
          {/* <div id='profile-dropdown-2'>Welcome back to Treebnb</div> */}
          <div id='profile-dropdown-2'>{user.username}</div>
          <div id='profile-dropdown-3'>{user.email}</div>
          {/* YOOUR SPOTS? */}
          <div id='profile-dropdown-4'>
            <button id='profile-logout-button' onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
