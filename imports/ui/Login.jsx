import React, { useState, useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const user = Meteor.user();
    const navigate = useNavigate();
    console.log('1');
    console.log(user);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
        console.log('2');
        console.log(user);
    });



    return (
        <div className="container content-container">
            < LoginForm />
            { console.log('3') }
            { console.log(user) }
        </div>
    );
};