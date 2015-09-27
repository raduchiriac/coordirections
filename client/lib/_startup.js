Meteor.startup(function () {
  BlazeLayout.setRoot('body');
  subs = new SubsManager();
});
