import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const JobForm = ({user, job}) => {
    const navigate = useNavigate();
    const [success, setSuccess] = useState('');

    let defaultInput;

    job ? defaultInput = job : defaultInput = {};

    const [inputs, setInputs] = useState(defaultInput);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]:value}));
    };

  const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        
        //if (job) inputs = job;

        if (!job && !inputs.text) return;
        if (!job && !inputs.description) return;

        if(job) {
            Meteor.call('jobs.update', {
                jobId: job._id, 
                text: inputs.text, 
                description: inputs.description
            }, (error, result) => {
                if (error) {
                    throw new Meteor.Error(error.message);
                } else if (result) {
                    setSuccess(result);
                }
            });

        } else {
            Meteor.call('jobs.insert', inputs.text, inputs.description);
            navigate('/your-jobs');
        }

  };

  return (
    <form className="account-form" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="text">Job Post Name</label>
            <input
                type="text"
                name="text"
                value={ inputs.text || '' }
                onChange={handleChange}
            />

        </div> 
      
        <div>
            <label htmlFor="description">Description</label>
            <textarea
                name="description"
                defaultValue={ inputs.description || '' }
                onChange={handleChange}
                
            ></textarea>
        </div>

      <button type="submit">{ job ? 'Update Job' : 'Create Job' }</button>
        <div>
            { success }
        </div>
    </form>
  );
};