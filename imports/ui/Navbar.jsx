import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker} from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {

    const navigate = useNavigate();
    const user = useTracker(() => Meteor.user(), []);

    const logout = () => {
        Meteor.logout();
        navigate('/login');
    }
    
    return (

        <div className="container user">
            {  user ? (
                <>
                    Welcome back,  { user.username }!  
                    <a href="/your-jobs">Your Jobs</a>
                    <button  onClick={logout} >Logout</button>
                </> ) : ( 
                <>
                    <a href="login">Login</a> | <a href="/register">Register</a> 
                </>)
            }
        </div>
    );
}