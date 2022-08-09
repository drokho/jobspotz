import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { JobsCollection } from '/imports/db/JobsCollection';
import { ServiceConfiguration } from 'meteor/service-configuration';
import '/imports/api/jobsMethods';
import '/imports/api/jobsPublications';

const insertJob = (jobText, user) => 
    JobsCollection.insert({ 
        text: jobText,
        userId: user._id,
        createdAt: new Date(), 
    });

const SEED_USERNAME = 'bgamble';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
    
    if (!Accounts.findUserByUsername(SEED_USERNAME)){
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }

    const user = Accounts.findUserByUsername(SEED_USERNAME);

    if (JobsCollection.find().count() === 0) {
        [
            'First Job',
            'Second Job',
            'Third Job',
            'Fourth Job',
            'Fifth Job',
            'Sixth Job',
            'Seventh Job',
        ].forEach(jobText => insertJob(jobText, user));
    }

    ServiceConfiguration.configurations.upsert(
        {service: 'github'},
        {
            $set: {
                loginStyle: 'popup',
                clientId: '4a7a6988ad5e241275b9',
                secret: '539cecee75ee83b6aebfe4aa866d36e327ad73f3',
            },
        }
    )


}); 
