import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, browserHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsList } from '/imports/ui/JobsList.jsx';
import { NewJob } from '/imports/ui/NewJob.jsx';
import { YourJobs } from '/imports/ui/YourJobs.jsx';
import { Register } from '/imports/ui/Register.jsx';
import { Login } from '/imports/ui/Login.jsx';
import { ProtectedRoute } from '/imports/startup/client/protected-route.js';
import { Loading } from '/imports/ui/Loading.jsx';
import { render } from 'react-dom';



export const App = () => {

    const user = useTracker(() => Meteor.user());
    
    console.log(this.props);

    return (
        
        <Router history={browserHistory}>
            <Routes>
                <Route exact path="new-job" element={<NewJob />} />
                <Route exact path="your-jobs" element={ user ? <YourJobs /> : <Loading /> } />
                <Route exact path="/" element={ user ? <JobsList /> : <Loading /> } />
                <Route exact path="register" element={ <Register /> } />
                <Route exact path="login" element={ <Login /> } />

            </Routes>
        </Router> 
    ) 
    
};
