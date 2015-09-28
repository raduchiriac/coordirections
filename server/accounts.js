Accounts.onCreateUser(function (options, user) {
  user.location = {
    type: "Point",
    coordinates: giveRandomCoordinates('Paris')
  };
  user.status = {
    'online': true
  };
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});
