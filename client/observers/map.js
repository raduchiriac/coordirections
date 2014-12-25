function locationError(error) {
  // the current position could not be located
  console.log(error, 'error getting your location');
}

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

window.googleMapsLoaded = function() {
  try {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
  } catch (err) {}
}

Template.map.events({
  'click .meet': function(event, template) {
    event.preventDefault();
    $('#map_canvas').toggleClass('open');
    $('.results').toggleClass('open');
  }
});

Deps.autorun(function(c) {
  try {
    UserStatus.startMonitor({
      threshold: 30000,
      idleOnBlur: true
    });

    c.stop();
  } catch (ignore) {}
});

Template.map.rendered = function() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '//maps.google.com/maps/api/js?callback=googleMapsLoaded';
  document.body.appendChild(script);
};

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});