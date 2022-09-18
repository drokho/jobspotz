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
        console.log(e.target.name + ', ' + e.target.value);
        setInputs(values => ({...values, [name]:value}));
    };

    const deleteJob = () => {
        console.log(job._id);
        Meteor.call('jobs.remove', job._id, 
        (error, result) => {
            if (error) {
                throw new Meteor.Error(error.message);
            } else if (result) {
                window.location.href = '/your-jobs';
                //setSuccess(result);
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        
        //if (job) inputs = job;

        if (!job && !inputs.text) {
            console.log('text is wrong');
            return;
        };
        if (!job && !inputs.description) {
            console.log('description is wrong');
            return;
        };
        if (!job && !inputs.company) {
            console.log('company is wrong');
            return;
        };
        if (!job && !inputs.streetAddress) {
            console.log('streetAddress is wrong');
            return;
        };
        if (!job && !inputs.city) {
            console.log('city is wrong');
            return;
        };
        if (!job && !inputs.state) {
            console.log('state is wrong');
            return;
        };
        if (!job && !inputs.zip) {
            console.log('zip is wrong');
            return;
        };
        if (!job && !inputs.pay) {
            console.log('pay is wrong');
            return;
        };
        if (!job && !inputs.payType) {
            console.log('payType is wrong');
            return;
        };
        if (!job && !inputs.postedDate) {
            console.log('payType is wrong');
            return;
        };
        
        

        if(job) {
            Meteor.call('jobs.update', {
                jobId: job._id, 
                text: inputs.text, 
                description: inputs.description,
                company: inputs.company,
                streetAddress: inputs.streetAddress,
                city: inputs.city,
                state: inputs.state,
                zip: inputs.zip,
                pay: inputs.pay,
                payType: inputs.payType,
                postedDate: inputs.postedDate
            }, (error, result) => {
                if (error) {
                    throw new Meteor.Error(error.message);
                } else if (result) {
                    setSuccess(result);
                }
            });

        } else {
            Meteor.call('jobs.insert', 
                inputs.text, 
                inputs.description, 
                inputs.company, 
                inputs.streetAddress, 
                inputs.city, 
                inputs.state, 
                inputs.zip, 
                inputs.pay, 
                inputs.payType, 
                inputs.postedDate
            );
            navigate('/your-jobs');
        }

  };

  return (
    <>
    { job && <div>
            <button onClick={deleteJob}>Delete This Job</button>
        </div> }
        <form onSubmit={handleSubmit}>
            <h1>{ job ? 'Edit Job Posting' : 'Create a Job Posting' }</h1>
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
                <label htmlFor="company">Company Name</label>
                <input
                    type="text"
                    name="company"
                    value={ inputs.company || '' }
                    onChange={handleChange}
                />
            </div> 

            <div>
                <label htmlFor="street-address">Street Address</label>
                <input
                    type="text"
                    name="streetAddress"
                    value={ inputs.streetAddress || '' }
                    onChange={handleChange}
                />
            </div> 

            <div>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    value={ inputs.city || '' }
                    onChange={handleChange}
                />
            </div> 

            <div>
                <label htmlFor="state">State</label>
                <input
                    type="text"
                    name="state"
                    value={ inputs.state || '' }
                    onChange={handleChange}
                />
            </div> 

            <div>
                <label htmlFor="zip">Zipcode</label>
                <input
                    type="text"
                    name="zip"
                    value={ inputs.zip || '' }
                    onChange={handleChange}
                />
            </div> 

            <div>
                <label htmlFor="pay">Pay Amount</label>
                <input
                    type="number"
                    name="pay"
                    value={ inputs.pay || '' }
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="payType">Hourly or Salary</label>
                <select
                    name="payType"
                    id="payType"
                    value={ inputs.payType || '' }
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="hourly">Hourly</option>
                    <option value="salary">Yearly Salary</option>
                </select>
            </div> 

            <div>
                <label htmlFor="postedDate">Date to Activate Job Posting</label>
                <input
                    type="date"
                    name="postedDate"
                    value={ inputs.postedDate || '' }
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
            <div>
                <button type="submit">{ job ? 'Update Job' : 'Create Job' }</button>
            </div>
            <div>
                { success }
            </div>
            <div>
                <a href="/your-jobs">Back to Your Jobs</a>
            </div>
        </form>
        <div>
            success: { success }
        </div>
    </>
    
  );
};