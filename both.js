// BOTH
Connections = new Meteor.Collection('connections');
Friends = new Meteor.Collection('friends')

// SERVER
if (Meteor.isServer) {
  Meteor.startup(function() {

    // !DENY
    Meteor.users.deny({
      update: function() {
        return true;
      }
    });

    // !ALLOW
    Connections.allow({
      insert: function(userId, doc) {
        if (userId) {
          return true;
        }
        return false;
      },
      update: function(userId, doc, fields, modifier) {
        return true;
      },
      remove: function(userId, doc) {
        return true;
      },
    });

    Friends.allow({
      insert: function(userId, doc) {
        if (userId) {
          return true;
        }
        return false;
      },
      update: function(userId, doc, fields, modifier) {
        //...
      },
      remove: function(userId, doc) {
        //...
      }
    });
  });
}

// CLIENT
if (Meteor.isClient) {

}