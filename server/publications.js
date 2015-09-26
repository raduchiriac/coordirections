Meteor.publish("usersInBounds", function (box) {
  return Meteor.users.find({
    "status.online": true,
    location: {
      $geoWithin: {
        $box: box
      }
    }
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
