import { Meteor } from 'meteor/meteor';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { StateSelect } from './StateSelect';
import { Editor } from '@tinymce/tinymce-react';
import Geocode from "react-geocode";



export const JobForm = ({user, job}) => {

    Geocode.setApiKey('AIzaSyDGCkairfLS2qifFlIIKdxl7u_jvIQTpvI');

    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

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

    const deleteJob = (e) => {
        e.preventDefault();
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

            Geocode.fromAddress(inputs.streetAddress + ' ' + inputs.zip).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    return {lat, lng };
                },
                (error) => {
                    console.error(error);
                }
            ).then(function(result) { 
                inputs.latlong = {lat: result.lat, lng: result.lng};
                console.log(inputs.latlong);
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
                    postedDate: inputs.postedDate,
                    latlong: inputs.latlong
                }, (error, result) => {
                    if (error) {
                        throw new Meteor.Error(error.message);
                    } else if (result) {
                        displaySuccess(result);
                    }
                });
            });
    
            

        } else {
            Geocode.fromAddress(inputs.streetAddress + ' ' + inputs.zip).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    return {lat, lng };
                },
                (error) => {
                    console.error(error);
                }
            ).then(function(result) { 
                inputs.latlong = {lat: result.lat, lng: result.lng};
                console.log(inputs.latlong);
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
                    inputs.postedDate,
                    inputs.latlong
                );
                navigate('/your-jobs');
            });
        }
    };

    const displaySuccess = (result) => {
        setSuccess(result);
        $('.success-message').addClass('show');
        setTimeout(() => $('.success-message').removeClass('show'), 2000);

    }

    const handleEditorChange = () => {
        inputs.description = '<div>' + $('.mce-content-body').html() + '</div>';
    }


  return (
    <>
    { job && <div>
            
        </div> }
        <form onSubmit={handleSubmit}>
            <h1>{ job ? 'Edit Job Posting' : 'Create a Job Posting' } <button className="text-button" onClick={deleteJob}>Delete This Job</button></h1>
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
                <StateSelect inputs={ inputs } setInputs={ setInputs }/>
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
                <label htmlFor="pay">Pay Rate - what the applicant can REASONABLY expect to earn. Please be accurate, especially in the case of commission-based opportunities. </label>
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
        
            { /* <div>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    defaultValue={ inputs.description || '' }
                    onChange={handleChange}
                    
                ></textarea> 
            </div> */}
            <label>Enter your job description below. </label>
            <div className="tiny-mce-container">
                <Editor
                    apiKey='acgpxjcp5s888lvy1rwzgvbb5204tpx01li1m2oxg2o797e8'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={ inputs.description || '' }
                    textareaName="description"
                    inline
                    onChange={handleEditorChange}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Ubuntu, Helvetica,Arial,sans-serif; font-size:18px }',
                    init_instance_callback: function (editor) {
                        // This will trick the editor into thinking it was focused
                        // without actually focusing it (causing the toolbar to appear)
                        editor.fire('focus');
                      },
                      setup: function (editor) {
                        // This prevents the blur event from hiding the toolbar
                        editor.on('blur', function () {
                            return false;
                        });
                      }
                    }}
                    
                />
            </div>
            
            <div>
                <button name="submitbtn">{ job ? 'Update Job' : 'Create Job' }</button>
            </div>
            <div className="success-message">
                { success }
            </div>
            <div>
                { job && <p><a href={ '/job/' + job._id} >View Job</a></p>}
                <a href="/your-jobs">Back to Your Jobs</a>
            </div>
        </form>
    </>
    
  );
};