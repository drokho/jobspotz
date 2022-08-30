import { Meteor } from 'meteor/meteor';
import React, { useEffect } from 'react';
import { LoginForm } from './LoginForm';

export const Loading = () => {

    return (
    <div className="container content-container">
       { Meteor.loggingIn() ? 'Loading...' : <LoginForm />}
    </div>
    );
};