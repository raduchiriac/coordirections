Meteor.publish('mongoStrangers', function() {
  return Strangers.find({});
});

Meteor.publish("mongoUsersOnline", function() {
  return Meteor.users.find({
    "status.online": true,
  }, {
    fields: {
      status: 1,
      username: 1,
      'position.coords.latitude': 1,
      'position.coords.longitude': 1
    }
  });
});