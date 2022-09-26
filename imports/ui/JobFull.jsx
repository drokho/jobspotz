import React from 'react';
import {useParams} from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { JobsCollection } from '/imports/db/JobsCollection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';




export const JobFull = () => {

    // setting edit to true hides the apply button and shows the edit and delete buttons.
    const { id } = useParams();

    const user = useTracker(() => Meteor.user(), []);

    const job = useTracker(() => {

        // jobs is the name of the collection in db/JobsCollection.js
        const jobSub = Meteor.subscribe('jobs');
        const job = JobsCollection.findOne({ _id:id });

        return job;
    });

    const payType = () => {
        if(job.payType == 'hourly') {
            return '/hr';
        }

        if(job.payType == 'salary') {
            return '/yr Salary';
        }
    }

    let owner = false;

    user && job ? ( job.userId == user._id ? owner = true : owner = false ) : owner = false;


  return (
    <div className="container-fluid full-page-content">
        <div>
            <a href="/"><FontAwesomeIcon icon={faChevronLeft} /> Back to Jobs List</a>
        </div>
        { job ? (
            <div className="full-job-container">
                <h1>{ job.text } {owner && <a className="title-edit" href={ '/edit/' + job._id }>Edit</a> }</h1>
                <h2>{ job.company }</h2>
                <address>
                    { job.streetAddress }<br />
                    { job.city } { job.state }, { job.zip }
                </address>
                <div>
                    Pay: ${ job.pay + payType() }
                </div>
                <div>
                    { job.postedDate }
                </div>
                <div className="job-description" dangerouslySetInnerHTML={{ __html: job.description }}>
                </div>
            </div>) : ( 'Loading...') 
        }
    </div>
  );
};