import React from 'react';
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
    const jobs = useTracker(() => JobsCollection.find({}, {sort: { createdAt: -1 } }).fetch());
    
    return (
        <div>
            <h1>JobSpotz!</h1>

            <JobForm />

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
    );
};
