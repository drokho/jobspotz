import { Meteor } from 'meteor/meteor';

import { JobsCollection } from '/imports/api/JobsCollection';

const insertJob = jobText => JobsCollection.insert({ text: jobText });

Meteor.startup(() => {
    if (JobsCollection.find().count() === 0) {
        [
            'First Job',
            'Second Job',
            'Third Job',
            'Fourth Job',
            'Fifth Job',
            'Sixth Job',
            'Seventh Job',
        ].forEach(insertJob)
    }
}); 
