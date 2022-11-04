import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsCollection } from '/imports/db/JobsCollection';
import { JobSmall } from './JobSmall';
import { Map } from './Map';


const toggleChecked = ({ _id, isChecked }) => 
    Meteor.call('jobs.setIsChecked', _id, !isChecked);


export const JobsList = (props) => {
    const [mobileMap, setMobileMap] = useState('');
    const [loadingExternalJobs, setLoadingExternalJobs] = useState(false)
    const [mobileMapTxt, setMobileMapTxt] = useState('Show on Map');
    const [searchError, setSearchError] = useState();
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

        return { jobs, availableJobsCount }; 

    });

    let availableJobs = 0;
    if (availableJobsCount) availableJobs = availableJobsCount;

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

  
    const [data, setData] = useState([])

    useEffect(() => {

        //console.log(props.keywords)

        /* uncomment this before launching to pull in real jobs from careerbuilder
         */
 

    }, []);

    //console.log(data);

    const onSearchReceived = () => {

        setLoadingExternalJobs(true);

        Meteor.call('scrape', {keywords: props.keywords, loc: 48160}, (err, res) => {
            setSearchError(undefined);
            if(err)console.log(err);
            if(typeof(res) == 'string') {
                setSearchError(res);
            } else {
                setData(res);
                console.log(data)
            }

            setLoadingExternalJobs(false);
        });
    }

    props.receiverCreator(onSearchReceived);

    
    return (
        <div className="jobs-list">
            <div className="jobs-list-header container-fluid align-center drop-shadow">
                { searchError ? 
                <h2>{ searchError }</h2>
                : <>
                    <h1>There are { availableJobs + data.length } Jobs Near You</h1>
                    <h2>That match your search criteria: 
                        <span className="filter">x Filter 1</span>, 
                        <span className="filter">x Filter 2</span>, 
                        <span className="filter">x Filter 3</span>
                    </h2>
                </> }
                <div className="map-list">
                    <button onClick={ toggleMobileMap }>{ mobileMapTxt }</button> 
                </div>
            </div>
            <div className='container-fluid map-container'>
                <div className={ 'map ' + mobileMap }>
                    <Map jobs={ data.concat(jobs) }/>
                </div>
                
                { isLoading && <h2 className="loading">loading...</h2> }
                { loadingExternalJobs ?  
                <ul className={ mobileMap }>
                    <JobSmall loading='true' />
                </ul> 
                :
                <ul className={ mobileMap }>
                    {  data.concat(jobs).map((job, index) => <JobSmall 
                    //jobs.map((job, index) => <JobSmall
                        key={ job._id} 
                        job={ job } 
                        index={ 'Marker ' + (index + 1) }
                        onCheckboxClick={toggleChecked}
                    />) }
                </ul> }
            </div>
        </div>
    );
     
};


