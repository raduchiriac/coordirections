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

Meteor.publish("mongoConnectionsTowardsMe", function() {
  return Connections.find();
});

Meteor.publish("mongoMyFriends", function() {
  return Friends.find({
    _id: this.userId
  });
});