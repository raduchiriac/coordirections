Meteor.publish("usersInBounds", function (box) {
  var selector = {
    "_id": {
      $ne: this.userId
    },
    // "status.online": true,
    "location.coordinates": {
      $geoWithin: {
        $box: box
      }
    }
  };
  return Users.find(selector);
});

// Meteor.publish("mongoConnectionsTowardsMe", function () {
//   return Connections.find();
// });
