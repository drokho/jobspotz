import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

export const JobSmall = ({ job, onCheckboxClick, onDeleteClick, edit }) => {

    // setting edit to true hides the apply button and shows the edit and delete buttons.
    const user = useTracker(() => Meteor.user());

  return (
    <li className="job-posting">
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
                { edit && <a className="button" href="">Edit</a> }
                { user && !edit &&
                    <span>
                        <span className="button apply">Apply</span>
                        <span className="button applied">Applied!</span>
                    </span>
                }
            </label>
    
        </div>
        <div className="job-posting-bottom">
            <div className="job-description">{ job.description }</div>
            <a href={ 'job/' + job._id } className="show-more">Read More...</a>
        </div>
        
        
        
    </li>
  );
};