import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker} from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export const MobileNav = () => {

    const navigate = useNavigate();
    const user = useTracker(() => Meteor.user(), []);

    const logout = (e) => {
        e.preventDefault();
        Meteor.logout();
        navigate('/login');
    }

    const closeMenu = () => {
        $('.menu-container').removeClass('open');
    }

    const openMenu = () => {
        $('.menu-container').addClass('open');
    }

    return (

        <div className="mobile-nav">
            <div className="main-buttons">
                <button  onClick={openMenu}>
                    <FontAwesomeIcon icon={faBars} />Menu
                </button>
                { !user && <a href="/login" className="button">
                    <FontAwesomeIcon icon={faRightToBracket} />Login
                </a> }
                { user && <button onClick={logout}>
                    <FontAwesomeIcon icon={faRightFromBracket} />Log Out
                </button> }
            </div>
            <div className="mobile-menu-container">
                <div className="menu">
                    <div className="grid">
                        <div>
                            <h2>Menu</h2>
                        </div>
                        <div className="align-right">
                            <button className="menu-close" onClick={closeMenu}><FontAwesomeIcon icon={faXmark} /> Close</button>
                        </div>
                    </div>
                    <ul>
                        {  user && <li>
                            <a href="/my-account">
                                <FontAwesomeIcon icon={faCircleUser} />{ user.username }'s Account
                            </a> 
                        </li> }
                        { user && <li className="list-group">
                            Job Seekers
                        </li> }
                        {  user && <li>
                            <a href="/my-account">
                                <FontAwesomeIcon icon={faStar} />Saved Jobs
                            </a> 
                        </li> }
                        { user && <li className="list-group">
                            Job Posters
                        </li> }
                        {  user &&  <li>
                            <a href="/your-jobs">
                                <FontAwesomeIcon icon={faUserTie} />Your Jobs
                            </a> 
                        </li> }
                        {  user &&  <li>
                            <a href="/new-job">
                                <FontAwesomeIcon icon={faPenToSquare} />Create a Job
                            </a> 
                        </li> }
                        { !user && <li className="list-group">
                            <a href="login">
                                <FontAwesomeIcon icon={faRightToBracket} />Login
                            </a> 
                        </li>}
                        { !user && <li>
                            <a href="/register">
                                <FontAwesomeIcon icon={faUserPlus} />Register
                            </a> 
                        </li> }
                        {  user &&  <li className="list-group">
                            <span onClick={logout} className="nav-text-only cursor-pointer">
                                <FontAwesomeIcon icon={faRightFromBracket} />Logout
                            </span>
                        </li> }
                        <li>
                            <a href="/">
                                <FontAwesomeIcon icon={faHouse} />Home
                            </a> 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}