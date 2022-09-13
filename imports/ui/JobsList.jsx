import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsCollection } from '/imports/db/JobsCollection';
import { JobSmall } from './JobSmall';
import { Loading } from './Loading';
import { useNavigate } from 'react-router-dom';



const toggleChecked = ({ _id, isChecked }) => 
    Meteor.call('jobs.setIsChecked', _id, !isChecked);


export const JobsList = () => {
  
    const user = useTracker(() => Meteor.user());
    const [hideApplied, setHideApplied] = useState(false);
    const hideAppliedFilter = { isChecked: { $ne: true } };
    //const userFilter = user ? {userId: user._id } : {};
    const userFilter = user ? { } : {};
    const pendingOnlyFilter = { ...hideAppliedFilter, ...userFilter };

    const { jobs, availableJobsCount, isLoading } = useTracker(() => {

        const noDataAvailable = { jobs: [], availableJobsCount: 0 };

        /*
        if( !Meteor.user() ) {
            return noDataAvailable;
        }
        */
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
    
    return (
        <div className="jobs-list">
            <div className="container-fluid align-center drop-shadow">
                <h1>There are {availableJobsTitle} Jobs Near You</h1>
                <h2>That match your search criteria: 
                    <span className="filter">x Filter 1</span>, 
                    <span className="filter">x Filter 2</span>, 
                    <span className="filter">x Filter 3</span>
                </h2>
            </div>
            <div className="container-fluid map-container">
                <h2>{isLoading && <div className="loading">loading...</div>}</h2>

                <ul>
                    { jobs.map(job => <JobSmall 
                        key={ job._id} 
                        job={ job } 
                        onCheckboxClick={toggleChecked}
                    />) }
                </ul>
            </div>
            { /*user && <a href="new-job">Post a New Job</a> */}
            { /* user &&
                <div className="filter">
                    <button onClick={() => setHideApplied(!hideApplied)}>
                        {hideApplied ? 'Show All' : 'Hide Applied'}
                    </button>
                    </div> */}
        </div>
    );
     
};


