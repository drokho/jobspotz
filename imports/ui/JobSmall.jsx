import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const JobSmall = ({ job, onCheckboxClick, edit, loading, index }) => {

    // setting edit to true hides the apply button and shows the edit and delete buttons.
    const user = useTracker(() => Meteor.user());
    const payType = () => {
        if(!loading && job.payType == 'hourly') {
            return '/hr';
        } else if (!loading && job.payType == 'salary') {
            return '/yr Salary';
        } else {
            return ' ' + job.payType
        }
    }
    const pay = () => {
        if(!loading && job.pay) {
            return '$' + job.pay
        } else {
            return '';
        }
    }

  return (
    <>
        <li className="job-posting card drop-shadow">
            <div className="grid">
                <div className="job-posting-info">
                    <h3 className="card-title">
                        {loading ? 'Loading...' : job.text}
                    </h3>
                </div>
                { !loading &&
                <div className="align-right">
                    <a href={'job/' + job._id } className="job-save"><FontAwesomeIcon icon={faStar} /></a>
                </div>
                }
            </div>
            { !loading && <>
            <div className="job-company">
                { job.company + ' - ' + job.city + ', ' +  job.state }
            </div> 
            
            <div className="job-pay">
                { pay() + payType() }
            </div>
            <div className="grid">
                <div className="job-date">
                    { job.postedDate } <br />
                    { index }
                </div>
                <div className="align-right">
                    
                    <label htmlFor={ 'apply-now-' + job._id } >
                        <input 
                            id={ 'apply-now-' + job._id }
                            name={ 'apply-now-' + job._id }
                            type="checkbox"
                            /* checked={!!job.isChecked} */
                            /* onClick={() => onCheckboxClick(job)} */
                            readOnly
                        />
                        
                        { /* user && edit && <a className="button" href={ '/edit/' + job._id }>Edit</a> */ }
                        { /*user && !edit &&
                            <span>
                                <span className="button apply">Apply</span>
                                <span className="button applied">Applied!</span>
                            </span>
                        */}
                        <a href="#" className="button apply">Apply</a>
                    </label>
                </div>
            </div> </>}
        </li>
    </>
  );
};