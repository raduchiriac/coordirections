Meteor.startup(function () {
  Meteor.users.remove({
    '_id': {
      $ne: '933zGmWvGHFD3mnMt'
    }
  });
  Coordinates.remove({
    'userId': {
      $ne: '933zGmWvGHFD3mnMt'
    }
  });

  var randomFromInterval = function (min, max) {
    return Math.random() * (max - min) + min;
  }

  if (Meteor.users.find({}).count() === 1) {
    _(9).times(function (n) {
      var aFakeUser = Fake.user({
        fields: ['username', 'email', 'fullname', 'emails.address', 'profile.name'],
      });
      aFakeUser.password = "1234";
      var insertId = Accounts.createUser(aFakeUser);

      Coordinates.insert({
        userId: insertId,
        coordinates: [
          randomFromInterval(2.265, 2.4104),
          randomFromInterval(48.820, 48.900)
        ]
      })
    });
  }
});
