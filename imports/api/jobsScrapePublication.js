import { Meteor } from 'meteor/meteor';
import { JobScrapeCollection } from '/imports/db/JobScrapeCollection';

Meteor.publish('jobScrape', function publishJobScrape() {

    return JobScrapeCollection.find({});
});



