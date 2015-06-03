Meteor.methods({
  updateUsersPosition: function (userId, position) {
    check(userId, String);
    check(position, [Number]);
    return Meteor.users.update({
      _id: userId
    }, {
      $set: {
        coordinates: position
      }
    });
  },
  addRandomUser: function () {
    var aFakeUser = Fake.user({
      fields: ['username', 'email', 'fullname', 'emails.address', 'profile.name'],
    });
    aFakeUser.password = "1234";
    /*
    aFakeUser.coordinates = this.randomCoordinatesParis();
    aFakeUser.status = {
      'online': true
    }*/
    Accounts.createUser(aFakeUser);
  },
  giveRandomCoordinatesParis: function () {
    var coordinates = [
      randomFromInterval(48.820, 48.900),
      randomFromInterval(2.265, 2.4104)
    ];
    console.log(coordinates);
    return coordinates;
  }
});
