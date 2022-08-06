import React from 'react';

export const Job = ({ job, onCheckboxClick, onDeleteClick }) => {
  return (
    <li>
        <span>
            <input 
                type="checkbox"
                checked={!!job.isChecked}
                onClick={() => onCheckboxClick(job)}
                readOnly
            />
        {job.text}
    </span>
    <button className="delete" onClick={ () => onDeleteClick(job) }>&times;</button>
    </li>
  );
};