Meteor.methods({
  updateUsersPosition: function(position) {
    check(position.coords, Object);
    return Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        position: position
      }
    });
  }
});