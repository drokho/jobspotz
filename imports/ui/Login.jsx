import React, { useState, useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const user = Meteor.loggingIn;
    const navigate = useNavigate();
   


    
    return (
        <>
            < LoginForm />

        </>
    );
};