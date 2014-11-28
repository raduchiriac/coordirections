// BOTH

Venues = new Meteor.Collection('venues');

// SERVER
if (Meteor.isServer) {
  Meteor.startup(function() {});
}

// CLIENT
if (Meteor.isClient) {

}