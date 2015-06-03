Meteor.methods({
  updateUsersPosition: function (position) {
    // check(position.coords, Object);
    // return Meteor.users.update({
    //   _id: Meteor.userId()
    // }, {
    //   $set: {
    //     position: position
    //   }
    // });
  },
  addRandomPerson: function () {
    var aFakeUser = Fake.user({
      fields: ['username', 'email', 'fullname', 'emails.address', 'profile.name'],
    });
    aFakeUser.password = "1234";
    var insertId = Accounts.createUser(aFakeUser);

    Coordinates.insert({
      userId: insertId,
      coordinates: [
        randomFromInterval(48.820, 48.900),
        randomFromInterval(2.265, 2.4104)
      ]
    })
  }
});
