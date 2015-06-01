Meteor.startup(function () {
  if (Meteor.isServer) {
    if (Object.keys(Meteor.settings).length === 0) {
      console.log("You forgot to run Meteor with --settings!");
    }
  }
});