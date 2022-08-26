import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { JobsCollection } from '/imports/db/JobsCollection';
import { Job } from './Job';



const toggleChecked = ({ _id, isChecked }) => 
    Meteor.call('jobs.setIsChecked', _id, !isChecked);


const deleteJob = ({ _id }) => Meteor.call('jobs.remove', _id);


export const JobsList = () => {

    const navigate = useNavigate();
    
    const user = useTracker(() => Meteor.user());
    const [hideApplied, setHideApplied] = useState(false);
    const hideAppliedFilter = { isChecked: { $ne: true } };
    //
    //use this to filter to current user
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

    const logout = () => {
        Meteor.logout(() => navigate('login'));
        
    }

    
    
    return (
        <div>
            <div className="container user">
                Welcome back, {user.username || user.profile.name}!
                <a href="your-jobs">Your Jobs</a>
                <button  onClick={logout} >Logout</button>
            </div>
            <div className="container content-container">
                <h2>Jobs Waiting for your Application: {availableJobsTitle}</h2>
                <div>
                    <a href="new-job">Post a New Job</a>
                </div>
                
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
            </div>
            
        </div>
    );
     
};
