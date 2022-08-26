import React, { useState } from 'react';
import { JobForm } from './JobForm';


export const NewJob = () => {

  return (
    <div className="container form-container">
        <h1>Create a Job Posting</h1>
        <JobForm />
        <a href="/">Back to Jobs Listings</a>
    </div>
  );
};
