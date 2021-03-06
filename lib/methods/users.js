Meteor.methods({
  updateUsersPosition: function (userId, position) {
    check(userId, String);
    check(position, {
      lat: Number,
      lng: Number
    });
    return Meteor.users.update({
      _id: userId
    }, {
      $set: {
        'location.coordinates': position
      }
    });
  },
  addRandomUser: function () {
    var aFakeUser = Fake.user({
      fields: ['username', 'email', 'fullname', 'emails.address', 'profile.name'],
    });
    aFakeUser.password = "123123";
    Accounts.createUser(aFakeUser);
  }
});
