Template.map.onRendered(function () {
  Mapbox.load('minimap', 'markercluster', 'directions');

  Tracker.autorun(function () {
    if (Mapbox.loaded()) {
      mapbox.initialize();
    }
  });
});


/*
function locationSuccess(position) {
  // initialize map with current position and calculate the route
  gmaps.initialize(position);

  Meteor.users.find({
    "_id": {
      $ne: Meteor.userId()
    }
  }).observe({
    added: function(user) {
      // console.log(user, '> just came online');
      gmaps.addMarker({
        lat: user.position.coords.latitude,
        lng: user.position.coords.longitude,
        title: user.username,
        username: user.username,
        _id: user._id
      });
    },
    changed: function(user, fields) {
      gmaps.changeMarker(user._id, user.position);
      gmaps.toggleStatus(user._id, user.status.idle);
    },
    removed: function(user, fields) {
      // console.log(user._id, '> just went offline');
      gmaps.removeMarker(user._id);
    }
  });
}

Template.map.events({
  'click .meet': function(event, template) {
    event.preventDefault();
    $('#map_canvas').toggleClass('open');
    $('.results').toggleClass('open');
  }
});

*/
