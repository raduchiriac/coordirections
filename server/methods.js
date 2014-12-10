Meteor.methods({
  getVenues: function(location, categoryId) {
    check(location, Object);
    check(categoryId, String);
    this.unblock();
    try {
      var result = HTTP.call("GET", "https://api.foursquare.com/v2/venues/search?client_id=" + Meteor.settings.keys.foursquare_client_id + "&client_secret=" + Meteor.settings.keys.foursquare_client_secret + "&limit=20&radius=400&v=20130815&categoryId=" + categoryId + "&ll=" + location.lat + "," + location.lng);
      return result;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  },
  randomIntFromInterval: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  addStranger: function(lng, lat, user) {
    return Strangers.insert({
      coordinates: {
        lng: lng,
        lat: lat
      },
      user: user
    });
  },
  updateUser: function(position) {
    return Meteor.users.update(Meteor.user()._id, {
      $set: {
        position: position
      }
    });
  }
});