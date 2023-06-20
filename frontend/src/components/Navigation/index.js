// frontend/src/components/Navigation/index.js
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileButton from "./ProfileButton";
import LoginFormModal from "../User/LoginFormModal";
import SignupFormModal from "../User/SignupFormModal";
import CreateSpotFormModal from "../Spots/CreateSpotFormModal";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  // const dropDownOnOff = () => {
  //   if (showMenu) return "dropdown-on";
  //   else return "dropdown-off";
  // };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => setShowMenu(false);
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <div className='navigation-buttons'>

        <div id="create-spot-button">
          <CreateSpotFormModal />
        </div>

        <div id="profile-button">
          <ProfileButton user={sessionUser} />
        </div>

      </div>
      </>
    );
  }
  else {
    sessionLinks = (
      <>
        {/* <LoginFormModal />
        <SignupFormModal /> */}

        {/* <div className="dropdown"> */}
          {/* <button
            className="dropdown-button"
            onClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}
          >
            <i id="hamburger-icon" className="fa-solid fa-bars"></i>
            <i id="profile-icon" className="fas fa-user-circle" /> */}
            {/* <img id='hamburger-icon' src='https://static.vecteezy.com/system/resources/previews/002/292/406/original/hamburger-menu-line-icon-free-vector.jpg' /> */}
          {/* </button> */}
        {/* </div> */}

          {/* <div className={dropDownOnOff()}> */}
          <div className="session-buttons">

          <div className={openMenu()} id="buttons-to-space">
            <a id='signup-button'href="#">
              <SignupFormModal />
            </a>

            <a id='login-button'href="#">
              <LoginFormModal />
            </a>
          </div>

          </div>
      </>
    );
  }

  return (
    <>
    <div className="navigation">

      <div className="navigation-wrap">
        <div className="navigation-bar">
            <NavLink exact to="/">
              <div className="treebnb">
                <img
                  className="green-airbnb-logo"
                  src="https://res.cloudinary.com/duvgdb8rd/image/upload/v1666469050/airbnb-xxl_ep5w6c.png"
                  alt="logo-1"
                  ></img>
              <div className="treebnb-text">treebnb</div>
          </div>
            </NavLink>


          <div>{isLoaded && sessionLinks}</div>
        </div>
      </div>
      </div>

      <div className="footer-bar-wrap">
        <div id="footer-left">
          <div id="created-by-name">2022 Created and Styled by Kristopher Han</div>
            <div id="social-icons">
              <a href="https://github.com/krispikris" target="_blank">
                <i id="github-icon" className="fa-brands fa-github"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/kristopherhan"
                target="_blank"
                >
                <i id="linkedin-icon" className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
