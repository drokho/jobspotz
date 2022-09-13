import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker} from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {

    const navigate = useNavigate();
    const user = useTracker(() => Meteor.user(), []);

    const logout = (e) => {
        e.preventDefault();
        Meteor.logout();
        navigate('/login');
    }

    return (

        <div className="user">
            <a href="/">
                <FontAwesomeIcon icon={faHouse} />
                <span className="nav-text">Home</span>
            </a>
            <a href="/">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span className="nav-text">Search</span>
            </a>
            <button>
                <FontAwesomeIcon icon={faBars} />
                <span className="nav-text">Menu</span>
            </button>
            {  user && <a href="/your-jobs">
                <FontAwesomeIcon icon={faUserTie} />
                <span className="nav-text">Your Jobs</span>
            </a> }
            { !user && <a href="login">
                <FontAwesomeIcon icon={faRightToBracket} />
                <span className="nav-text">Login</span>
            </a> }
            { !user && <a href="/register">
                <FontAwesomeIcon icon={faUserPlus} />
                <span className="nav-text">Register</span>
            </a> }
            {  user && <span className="nav-text nav-text_only">
                Welcome back,  { user.username }!
            </span> }
            {  user &&  <button onClick={logout} >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span className="nav-text">Logout</span>
            </button> }
        </div>
    );
}