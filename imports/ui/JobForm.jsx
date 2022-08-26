import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const JobForm = ({user}) => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]:value}));
    };

  const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        
        if (!inputs.name) return;
        if (!inputs.description) return;

        Meteor.call('jobs.insert', inputs.name, inputs.description);

        navigate('/your-jobs');

  };

  return (
    <form className="account-form" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Job Post Name</label>
            <input
                type="text"
                name="name"
                value={ inputs.name || '' }
                onChange={handleChange}
            />

        </div>
      
        <div>
            <label htmlFor="description">Description</label>
            <textarea
                name="description"
                defaultValue={ inputs.description || ''}
                onChange={handleChange}
                
            ></textarea>
        </div>

    


      <button type="submit">Create Job</button>
    </form>
  );
};