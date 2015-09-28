Meteor.methods({
  removeAllMyPreviousRoutes: function (id) {
    // return Connections.remove({
    //   from: id
    // });
  },
  removeASpecificConnection: function (from, to) {
    // return Connections.remove({
    //   from: from,
    //   to: to
    // });
  },
  proposeANewConnection: function (data) {
    // data.timestamp = new Date().getTime();
    // return Connections.insert(data);
  }
});
