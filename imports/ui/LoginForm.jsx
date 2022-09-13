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
    <div className="login-form container-fluid">
        <form onSubmit={submit}>
        <h1>Login</h1>
            <div>
                <LoginWithGithub />
            </div>
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
            <div>
            <button type="submit">Log In</button>
            </div>
            <div>
                New User? <a href="/register">Create an Account</a>
            </div>
        </form>
    </div>
  );
};