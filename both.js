// BOTH
Connections = new Meteor.Collection('connections');

// SERVER
if (Meteor.isServer) {
  Meteor.startup(function() {
    Meteor.users.deny({
      update: function() {
        return true;
      }
    });

    Connections.allow({
      insert: function (userId, doc) {
        if(userId) {
          return true;
        }
      },
      update: function (userId, doc, fields, modifier) {
        return true;
      },
      remove: function (userId, doc) {
        return true;
      },
    });
  });
}

// CLIENT
if (Meteor.isClient) {

}