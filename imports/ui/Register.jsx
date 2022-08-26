import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const submit = e => {
        e.preventDefault();
        Accounts.createUser({
            username: username,
            password: password,
        }); 
        navigate('/');
    }

    return (
        
        <div className="container form-container">
            <h1>Register</h1>
            <form onSubmit={submit} className="account-form">
                
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
            <button type="submit">Register</button>
                <div>
                    Already have an account?  <a href="/">Login</a>
                </div>
            </form>
        </div>
    )
}

