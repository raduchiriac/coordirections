Meteor.startup(function () {
  if (Object.keys(Meteor.settings).length === 0) {
    console.log("You forgot to run Meteor with --settings!");
  }
});
