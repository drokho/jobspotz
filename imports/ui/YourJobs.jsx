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
        <div>
            { user ? ( 
            <>
                <div className="container content-container">
                    <h1>Jobs You Have Posted: {availableJobsTitle}</h1>
                    <div>
                        <a href="new-job">Post a New Job</a> | <a href="/">Back to Jobs Listings</a>
                    </div>
                    
                    {isLoading && <div className="loading">loading...</div>}

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