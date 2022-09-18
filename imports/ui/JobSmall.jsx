import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const JobSmall = ({ job, onCheckboxClick, edit }) => {

    // setting edit to true hides the apply button and shows the edit and delete buttons.
    const user = useTracker(() => Meteor.user());
    const payType = () => {
        if(job.payType == 'hourly') {
            return '/hr';
        }

        if(job.payType == 'salary') {
            return '/yr Salary';
        }
    }

  return (
    <li className="job-posting card drop-shadow">
        <div className="grid">
            <div className="job-posting-info">
                <h3 className="card-title">
                    {job.text}
                </h3>
            </div>
            <div className="align-right">
                <a href={ 'job/' + job._id } className="job-save"><FontAwesomeIcon icon={faStar} /></a>
            </div>
        </div>
        <div className="job-company">
            { job.company } - { job.city }, { job.state }
        </div>
        <div className="job-pay">
            ${ job.pay + payType() }
        </div>
        <div className="grid">
            <div className="job-date">
                { job.postedDate }
            </div>
            <div className="align-right">
                
                <label htmlFor={ 'apply-now-' + job._id } >
                    <input 
                        id={ 'apply-now-' + job._id }
                        name={ 'apply-now-' + job._id }
                        type="checkbox"
                        checked={!!job.isChecked}
                        onClick={() => onCheckboxClick(job)}
                        readOnly
                    />
                    { edit && <a className="button" href={ '/edit/' + job._id }>Edit</a> }
                    { user && !edit &&
                        <span>
                            <span className="button apply">Apply</span>
                            <span className="button applied">Applied!</span>
                        </span>
                    }
                </label>
            </div>
        </div>
    </li>
  );
};