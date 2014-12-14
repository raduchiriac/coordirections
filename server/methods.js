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
  updateUsersPosition: function(position) {
    check(position.coords, Object);
    return Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        position: position
      }
    });
  },
  removeAllMyPreviousRoutes: function(id){
    Connections.remove({from:id});
  }
});