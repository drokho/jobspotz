import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Session } from 'meteor/session';
import { JobsCollection } from '/imports/db/JobsCollection';
 
Meteor.methods({
    'jobs.insert'(text, description, company, streetAddress, city, state, zip, pay, payType, postedDate, latlong) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        JobsCollection.insert({
            text,
            description,
            company,
            streetAddress, 
            city, 
            state,
            zip, 
            pay,
            payType,
            postedDate,
            createdAt: new Date,
            userId: this.userId,
            latlong
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

        if(JobsCollection.remove(jobId)) {
            return 'Job Removed!'
        } else {
            return 'Something went wrong.'
        }
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
        check(obj.company, String);
        check(obj.streetAddress, String);
        check(obj.city, String);
        check(obj.state, String);
        check(obj.zip, String);
        check(obj.pay, String);
        check(obj.payType, String);
        check(obj.postedDate, String); 

        if (!this.userId) { throw new Meteor.Error('Not authorized.'); }

        const job = JobsCollection.findOne({ _id: obj.jobId, userId: this.userId });
        if (!job) { throw new Meteor.Error('Access Denied'); }

        if (JobsCollection.update( 
            { _id: obj.jobId }, 
            {$set: {
                    text: obj.text,
                    description: obj.description,
                    company: obj.company,
                    streetAddress: obj.streetAddress, 
                    city: obj.city, 
                    state: obj.state,
                    zip: obj.zip,
                    pay: obj.pay,
                    payType: obj.payType,
                    postedDate: obj.postedDate,
                    latlong: obj.latlong

                }
            }, 
        )) {
            return 'Job Updated!'
        } else {
            return 'Something went wrong.'
        }
    },
});