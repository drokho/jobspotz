import React, { useState } from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsCollection } from '/imports/api/JobsCollection';
import { Job } from './Job';
import { JobForm } from './JobForm';

const toggleChecked = ({ _id, isChecked }) => {
    JobsCollection.update(_id, {
        $set: {
            isChecked: !isChecked
        }
    })
};

const deleteJob = ({ _id }) => JobsCollection.remove(_id);


export const App = () => {

    const [hideApplied, setHideApplied] = useState(false);
    const hideAppliedFilter = { isChecked: { $ne: true } };
    const jobs = useTracker(() => 
        JobsCollection.find(hideApplied ? hideAppliedFilter : {}, { 
            sort: { createdAt: -1 }, 
    }).fetch());
    
    return (
        <div>
            <div className="container header-container">
                <h1 className="site-title">JobSpotz!</h1>
            </div>
            
            <div className="container content-container">
                <JobForm />
                <div className="filter">
                    <button onClick={() => setHideApplied(!hideApplied)}>
                        {hideApplied ? 'Show All' : 'Hide Applied'}
                    </button>
                </div>
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
        </div>
    );
};
