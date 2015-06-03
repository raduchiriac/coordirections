Coordinates = new Meteor.Collection('coordinates');

Coordinates.helpers({
  user: function () {
    return Meteor.users.findOne(this.userId);
  }
});
