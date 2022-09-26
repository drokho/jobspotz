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
import { JobEdit } from './JobEdit.jsx';
import { PageHeader } from './PageHeader.jsx';
import { Loading } from './Loading.jsx';
import { Map } from './Map.jsx';



export const App = () => {

    const user = useTracker(() => Meteor.user(), []);
    
    return (
        <div>
            <Router history={browserHistory}>
                <PageHeader />
                
                <Routes>
                    <Route exact path="new-job" element={<NewJob />} />
                    <Route exact path="your-jobs" element={ user ? <YourJobs /> : <Loading /> } />
                    <Route exact path="/" element={ <JobsList />} />
                    <Route exact path="register" element={ <Register /> } />
                    <Route exact path="login" element={ <Login /> } />
                    <Route exact path="job/:id" element={ <JobFull /> } />
                    <Route exact path="edit/:id" element={ <JobEdit /> } />
                    <Route exact path="/map" element={ <Map /> } />

                </Routes>
            </Router> 
            <div className="footer container-fluid align-center dark-bg">
                &copy; Copyright 2022 Jobspotz.com
            </div>
        </div>
        
        
    ) 
    
};
