import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsCollection } from '/imports/db/JobsCollection';
import { JobSmall } from './JobSmall';
import { Loading } from './Loading';
import { useNavigate } from 'react-router-dom';

const deleteJob = ({ _id }) => Meteor.call('jobs.remove', _id);

export const YourJobs = () => {

    const user = useTracker(() => Meteor.user());
    const [hideApplied, setHideApplied] = useState(false);
    const hideAppliedFilter = { isChecked: { $ne: true } };
    const userFilter = user ? {userId: user._id } : {};
    //const userFilter = user ? { } : {};
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

    
    return (
        <div className="your-jobs">
            { user ? ( 
            <>
                <div className="container-fluid align-center drop-shadow">
                    <h1>You Have Posted {availableJobsTitle} Jobs</h1>
                    <h2>
                        <a href="new-job">Post a New Job</a> | <a href="/">Back to Jobs Listings</a>
                    </h2>
                </div>
                <div className="container-fluid">
                    <h2>
                        {isLoading && <div className="loading">loading...</div>}
                    </h2>
                    <ul>
                        { jobs.map(job => <JobSmall 
                            key={ job._id} 
                            job={ job } 
                            onDeleteClick={deleteJob}
                            edit="true"
                        />) }
                    </ul>
                </div>
            </> ) : ( 
            <>
                <Loading />
            </> ) }
            
        </div>
    );

};