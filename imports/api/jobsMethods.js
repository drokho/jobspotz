import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { JobsCollection } from '/imports/db/JobsCollection';
 
Meteor.methods({
    'jobs.insert'(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        JobsCollection.insert({
            text,
            createdAt: new Date,
            userId: this.userId,
        })
    },

    'jobs.remove'(jobId) {
        check(jobId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const job = JobsCollection.findOne({ _id: jobId, userId: this.userId });

        if (!job) {
            throw new Meteor.Error('Access Denied');
        }

        JobsCollection.remove(jobId);
    },

    'jobs.setIsChecked'(jobId, isChecked) {
        check(jobId, String);
        check(isChecked, Boolean);

        /*
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        */
        const job = JobsCollection.findOne({ _id: jobId, userId: this.userId });

        /*
        if (!job) {
            throw new Meteor.Error('Access Denied');
        }
        */
        JobsCollection.update(jobId, {
            $set: {
                isChecked
            }
        });
    }
});