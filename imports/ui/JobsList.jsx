import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsCollection } from '/imports/db/JobsCollection';
import { JobSmall } from './JobSmall';
import { Loading } from './Loading';
import { Map } from './Map';
import { useNavigate } from 'react-router-dom';



const toggleChecked = ({ _id, isChecked }) => 
    Meteor.call('jobs.setIsChecked', _id, !isChecked);


export const JobsList = () => {
    const [mobileMap, setMobileMap] = useState('');
    const [mobileMapTxt, setMobileMapTxt] = useState('Show on Map');
    const user = useTracker(() => Meteor.user());
    const [hideApplied, setHideApplied] = useState(false);
    const hideAppliedFilter = { isChecked: { $ne: true } };
    //const userFilter = user ? {userId: user._id } : {};
    const userFilter = user ? { } : {};
    const pendingOnlyFilter = { ...hideAppliedFilter, ...userFilter };

    const { jobs, availableJobsCount, isLoading } = useTracker(() => {

        const noDataAvailable = { jobs: [], availableJobsCount: 0 };
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

    const toggleMobileMap = () => {
        if (mobileMap == '') {
            setMobileMap('show');
            setMobileMapTxt('Show as List');
        }
        else if (mobileMap == 'show') {
            setMobileMap('');
            setMobileMapTxt('Show On Map');
        }
    }
6696
    
    
    return (
        <div className="jobs-list">
            <div className="jobs-list-header container-fluid align-center drop-shadow">
                <h1>There are {availableJobsTitle} Jobs Near You</h1>
                <h2>That match your search criteria: 
                    <span className="filter">x Filter 1</span>, 
                    <span className="filter">x Filter 2</span>, 
                    <span className="filter">x Filter 3</span>
                </h2>
                
                <div className="map-list">
                    <button onClick={ toggleMobileMap }>{ mobileMapTxt }</button> 
                </div>
            </div>
            <div className='container-fluid map-container'>
                <div className={ 'map ' + mobileMap}>
                    <Map jobs={ jobs }/>
                </div>
                
                { isLoading && <h2 className="loading">loading...</h2> }
                <ul className={ mobileMap }>
                    { jobs.map(job => <JobSmall 
                        key={ job._id} 
                        job={ job } 
                        onCheckboxClick={toggleChecked}
                    />) }
                </ul> 
            </div>
        </div>
    );
     
};


