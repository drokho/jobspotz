import React, { useState } from 'react';
import { JobsCollection } from '/imports/api/JobsCollection';

export const JobForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    JobsCollection.insert({
        text: text.trim(),
        createdAt: new Date()
    });

    setText("");

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