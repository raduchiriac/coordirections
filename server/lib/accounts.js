Accounts.onCreateUser(function (options, user) {
  user.location = {
    type: "Point",
    coordinates: Meteor.call('giveRandomCoordinates_Paris')
  };
  user.status = {
    'online': true
  };
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});
