Meteor.publish("usersInBounds", function (box) {
  var selector = {
    "_id": {
      $ne: this.userId
    },
    "status.online": true,
    "location.coordinates": {
      $geoWithin: {
        $box: box
      }
    }
  };
  var options = {
    fields: {
      'location.coordinates': 1,
      'status': 1,
      'username': 1
    }
  };
  return Users.find(selector, options);
});

// Meteor.publish("mongoConnectionsTowardsMe", function () {
//   return Connections.find();
// });
