import React from 'react';
import {useParams} from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsCollection } from '/imports/db/JobsCollection';




export const JobFull = () => {

    // setting edit to true hides the apply button and shows the edit and delete buttons.
    const { id } = useParams();

    const job = useTracker(() => {

        // jobs is the name of the collection in db/JobsCollection.js
        const jobSub = Meteor.subscribe('jobs');
        const job = JobsCollection.findOne({ _id:id });

        console.log(job)

        return job;

    });


  return (
    <div className="container-fluid">
        { job ? (
            <div className="full-job-container">
                <h1>{ job.text  }</h1>
                <div>
                    { job.description }
                </div>
            </div>) : ( 'Loading...') }
        
        { /*
        <div className="job-posting-top">
            
            <label htmlFor={ 'apply-now-' + job._id } >
                <h3>
                    {job.text}
                </h3>
                
                <input 
                    id={ 'apply-now-' + job._id }
                    name={ 'apply-now-' + job._id }
                    type="checkbox"
                    checked={!!job.isChecked}
                    onClick={() => onCheckboxClick(job)}
                    readOnly
                />
                { edit ? ( 
                        <a className="button" href="">Edit</a>
                    ) : (
                        <span>
                            <span className="button apply">Apply</span>
                            <span className="button applied">Applied!</span>
                        </span>
                )}
            </label> */ }
                    
            { /*edit ? (
                <>
                    <button className="delete" onClick={ () => onDeleteClick(job) }>&times;</button>
                </> ) : (
                    ''
                ) */}
    { /*
        </div>
        <div className="job-posting-bottom">
            <div className="job-description">{ job.description }</div>
            <a href="" className="show-more">Read More...</a>
        </div>
        
            */}
        <div>
            <a href="/">Back to Jobs List</a>
        </div>
        
    </div>
  );
};