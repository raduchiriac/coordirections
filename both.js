// BOTH
Venues = new Meteor.Collection('venues');
Strangers = new Meteor.Collection('strangers');

// SERVER
if (Meteor.isServer) {
  Meteor.startup(function() {
    // if (Strangers.find().count() === 0) {
    //   for (var i = 0; i < 20; i++) {
    //     var fake = Fake.user({
    //       fields: ['fullname', 'email'],
    //     });
    //     Strangers.insert({
    //       coordinates: {
    //         lng: Meteor.call('randomIntFromInterval', 2.265, 2.4104),
    //         lat: Meteor.call('randomIntFromInterval', 48.820, 48.900)
    //       },
    //       user: fake
    //     });
    //   }
    // }
    // Strangers.remove({})
  });
}

// CLIENT
if (Meteor.isClient) {

}

Strangers.allow({
  remove: function() {
    return true;
  },
  insert: function() {
    return true;
  }
});