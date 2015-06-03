Meteor.startup(function () {
  // Meteor.users.remove({
  //   '_id': {
  //     $ne: '933zGmWvGHFD3mnMt'
  //   }
  // });
  // Coordinates.remove({
  //   'userId': {
  //     $ne: '933zGmWvGHFD3mnMt'
  //   }
  // });

  if (Meteor.users.find({}).count() === 1) {
    _(9).times(function (n) {
      Meteor.call('addRandomPerson');
    });
  }
});
