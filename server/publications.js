Meteor.publish("usersInBounds", function () {
  return Meteor.users.find({
    "status.online": true,
  }, {
    // fields: {
    //   username: 1,
    //   'status.online': 1,
    //   'coordinates.lat': 1,
    //   'coordinates.lng': 1,
    // }
  });
});

// Meteor.publish("mongoConnectionsTowardsMe", function () {
//   return Connections.find();
// });
