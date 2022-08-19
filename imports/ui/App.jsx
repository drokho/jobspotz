import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Hello } from './Hello.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsCollection } from '/imports/db/JobsCollection';
import { Job } from './Job';
import { JobForm } from './JobForm';
import { LoginForm } from './LoginForm';



const toggleChecked = ({ _id, isChecked }) => 
    Meteor.call('jobs.setIsChecked', _id, !isChecked);


const deleteJob = ({ _id }) => Meteor.call('jobs.remove', _id);


export const App = () => {

    
    const user = useTracker(() => Meteor.user());
    const [hideApplied, setHideApplied] = useState(false);
    const hideAppliedFilter = { isChecked: { $ne: true } };
    //const userFilter = user ? {userId: user._id } : {};
    const userFilter = user ? { } : {};
    const pendingOnlyFilter = { ...hideAppliedFilter, ...userFilter };

    const { jobs, availableJobsCount, isLoading } = useTracker(() => {

        const noDataAvailable = { jobs: [], availableJobsCount: 0 };

        if( !Meteor.user() ) {
            return noDataAvailable;
        }

        const handler = Meteor.subscribe('jobs');

        if( !handler.ready() ) {
            return { ...noDataAvailable, isLoading: true };
        }

        const jobs = JobsCollection.find(
            hideApplied ? pendingOnlyFilter : userFilter,
            {
                sort: { createdAt: -1 },
            }
        ).fetch();

        const availableJobsCount = JobsCollection.find(pendingOnlyFilter).count();

        return { jobs, availableJobsCount }

    });

    const availableJobsTitle = `${
        availableJobsCount ? `${availableJobsCount}` : '0'
    }`;

    const logout = () => Meteor.logout();
    
    return (
        <div>
            
            
            {user ? ( 
                <>
                    <div className="container user">
                        Welcome back, {user.username || user.profile.name}!
                        <button  onClick={logout} >Logout</button>
                    </div>
                    <div className="container content-container">
                        <h2>Jobs Waiting for your Application: {availableJobsTitle}</h2>
                        <JobForm />
                        <div className="filter">
                            <button onClick={() => setHideApplied(!hideApplied)}>
                                {hideApplied ? 'Show All' : 'Hide Applied'}
                            </button>
                        </div>

                        {isLoading && <div className="loading">loading...</div>}

                        <ul>
                            { jobs.map(job => <Job 
                                key={ job._id} 
                                job={ job } 
                                onCheckboxClick={toggleChecked}
                                onDeleteClick={deleteJob}
                            />) }
                        </ul>
                        { /*<Hello/>
                        <Info/> */ }
                    </div>
                </>
            ) : (
                <LoginForm />
            )};
        </div>
    );
};
