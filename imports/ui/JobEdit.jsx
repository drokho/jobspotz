import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsCollection } from '/imports/db/JobsCollection';
import { JobForm } from './JobForm.jsx';




export const JobEdit = () => {

    // setting edit to true hides the apply button and shows the edit and delete buttons.
    const { id } = useParams();

    const user = useTracker(() => Meteor.user(), []);

    const job = useTracker(() => {
        // jobs is the name of the collection in db/JobsCollection.js
        const jobSub = Meteor.subscribe('jobs');
        const job = JobsCollection.findOne({ _id:id });

        return job;
    });

    let owner = false;

    user && job ? ( job.userId == user._id ? owner = true : owner = false ) : owner = false;


  return (
    <div className="container-fluid">
        { user ? ( owner ? ( <JobForm job={job} /> ) : ( <p>Access Denied</p> )) : (<p>Loading...</p>) }
    
    </div>
  );

};