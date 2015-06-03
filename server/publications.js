// Meteor.publish("mongoUsersOnline", function () {
//   return Meteor.users.find({
//     "status.online": true,
//   }, {
//     fields: {
//       status: 1,
//       username: 1,
//       'position.coords.latitude': 1,
//       'position.coords.longitude': 1
//     }
//   });
// });

// Meteor.publish("mongoConnectionsTowardsMe", function () {
//   return Connections.find();
// });

Meteor.publishComposite('usersInBounds', {
  find: function () {
    return Coordinates.find({});
  },
  children: [{
    find: function (coordinate) {
      var oneUser = Meteor.users.find({
        _id: coordinate.userId
      });
      return oneUser;
    }
  }]
});
