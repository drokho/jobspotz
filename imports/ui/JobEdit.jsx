import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsCollection } from '/imports/db/JobsCollection';
import { JobForm } from './JobForm.jsx';




export const JobEdit = () => {

    // setting edit to true hides the apply button and shows the edit and delete buttons.
    const { id } = useParams();

    const job = useTracker(() => {
        // jobs is the name of the collection in db/JobsCollection.js
        const jobSub = Meteor.subscribe('jobs');
        const job = JobsCollection.findOne({ _id:id });

        return job;
    });


  return (
    <div className="container-fluid">
        { job && <JobForm job={job} /> }
    </div>
  );

};