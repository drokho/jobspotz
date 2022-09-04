import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Session } from 'meteor/session';
import { JobsCollection } from '/imports/db/JobsCollection';
 
Meteor.methods({
    'jobs.insert'(text, description) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        JobsCollection.insert({
            text,
            description,
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

        const job = JobsCollection.findOne({ _id: jobId, userId: this.userId });

        JobsCollection.update(jobId, {
            $set: {
                isChecked
            }
        });
    },

    'jobs.update'(obj) {
        check(obj.text, String);
        check(obj.description, String);

        if (!this.userId) { throw new Meteor.Error('Not authorized.'); }

        const job = JobsCollection.findOne({ _id: obj.jobId, userId: this.userId });
        if (!job) { throw new Meteor.Error('Access Denied'); }

        if (JobsCollection.update( 
            { _id: obj.jobId }, 
            {$set: {
                    text: obj.text,
                    description: obj.description
                }
            }, 
        )) {
            return 'Job Updated!'
        } else {
            return 'Something went wrong.'
        }
    },
});