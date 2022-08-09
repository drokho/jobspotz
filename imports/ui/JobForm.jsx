import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';


export const JobForm = ({user}) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('jobs.insert', text);

    setText('');

  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add a new Job Posting"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />


      <button type="submit">Create Job</button>
    </form>
  );
};