import { Meteor} from 'meteor/meteor';
import React, { useState } from 'react';
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
import { Map } from './_Map.jsx';



export const App = () => {

    const [search, setSearch] = useState('');
    const user = useTracker(() => Meteor.user(), []);

    let receiver = (data) => {
        //no op
    }

    let trigger = (data) => {
        receiver && receiver(data);
    }

    const receiverCreator = (handler)  => {
        receiver = handler;
    }
    
    return (
        <div>
            <Router history={browserHistory}>
                <PageHeader search={ search } onSearchChange={ setSearch } onSearchClick={ trigger } />
                
                <Routes>
                    <Route exact path="new-job" element={<NewJob />} />
                    <Route exact path="your-jobs" element={ user ? <YourJobs /> : <Loading /> } />
                    <Route exact path="/" element={ <JobsList keywords={ search } receiverCreator={ receiverCreator } />} />
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
