Meteor.methods({
  updateUsersPosition: function (userId, position) {
    // check(userId, String);
    // check(position, [Number]);
    // return Meteor.users.update({
    //   _id: userId
    // }, {
    //   $set: {
    //     coordinates: position
    //   }
    // });
  },
  addRandomUser: function () {
    var aFakeUser = Fake.user({
      fields: ['username', 'email', 'fullname', 'emails.address', 'profile.name'],
    });
    aFakeUser.password = "123123";
    Accounts.createUser(aFakeUser);
  },
  giveRandomCoordinates_Paris: function () {
    return {
      lat: randomFromInterval(48.82000001, 48.90000001),
      lng: randomFromInterval(2.26500001, 2.41040001),
    };
  }
});
