Meteor.publish('mongoStrangers', function() {
  return Strangers.find({});
});