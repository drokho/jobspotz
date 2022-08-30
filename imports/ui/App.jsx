import { Meteor} from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, browserHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsList } from './JobsList.jsx';
import { NewJob } from './NewJob.jsx';
import { YourJobs } from './YourJobs.jsx';
import { Register } from './Register.jsx';
import { Login } from './Login.jsx';
import { JobFull } from './JobFull.jsx';
import { Navbar } from './Navbar.jsx';
import { Loading } from './Loading.jsx';



export const App = () => {

    const user = useTracker(() => Meteor.user(), []);

    return (
        <div>
            <Router history={browserHistory}>
                <div className="container header-container">
                    <h1>
                        <a href="/" className="site-title">JobSpotz!</a>
                    </h1>
                </div>
                <Navbar />
                <Routes>
                    <Route exact path="new-job" element={<NewJob />} />
                    <Route exact path="your-jobs" element={ user ? <YourJobs /> : <Loading /> } />
                    <Route exact path="/" element={ <JobsList />} />
                    <Route exact path="register" element={ <Register /> } />
                    <Route exact path="login" element={ <Login /> } />
                    <Route exact path="job/:id" element={ <JobFull /> } />

                </Routes>
            </Router> 
        </div>
        
        
    ) 
    
};
