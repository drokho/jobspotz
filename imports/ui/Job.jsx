import React from 'react';

export const Job = ({ job, onCheckboxClick, onDeleteClick }) => {
  return (
    <li className="job-posting">
        <span><label htmlFor={ 'apply-now-' +  job._id }>
            <input 
                id={ 'apply-now-' +  job._id }
                name={ 'apply-now-' +  job._id }
                type="checkbox"
                checked={!!job.isChecked}
                onClick={() => onCheckboxClick(job)}
                readOnly
            />
            <span className="apply-button apply">Apply</span>
            <span className="apply-button applied">Applied!</span>
            </label>
            {job.text}
        </span>
        <button className="delete" onClick={ () => onDeleteClick(job) }>&times;</button>
    </li>
  );
};