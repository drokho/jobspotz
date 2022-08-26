import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginWithGithub } from './LoginWithGithub';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password, () => navigate('/'));
    
    
  };

  return (
    <div className="container form-container">
        <h1>Login</h1>
        <form onSubmit={submit} className="account-form">
            <LoginWithGithub />
            <div>
                <label htmlFor="username">Username</label>

                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
        <button type="submit">Log In</button>
            <div>
                New User? <a href="/register">Create an Account</a>
            </div>
        </form>
    </div>
  );
};