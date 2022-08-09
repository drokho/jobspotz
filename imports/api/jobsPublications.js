import { Meteor } from 'meteor/meteor';
import { JobsCollection } from '/imports/db/JobsCollection';

Meteor.publish('jobs', function publishJobs() {
  //return JobsCollection.find({ userId: this.userId });
  return JobsCollection.find({ });
});