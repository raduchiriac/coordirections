var map,
  currentPosition,
  directionsDisplay,
  directionsService,
  currentLat,
  currentLng,
  infowindow;

function initializeMapAndCalculateRoute(lat, lon) {
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
  directionsService = new google.maps.DirectionsService();

  currentPosition = new google.maps.LatLng(lat, lon);

  infowindow = new google.maps.InfoWindow();

  currentLng = lon;
  currentLat = lat;

  map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 15,
    center: currentPosition,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{
      "featureType": "landscape",
      "stylers": [{
        "saturation": -100
      }, {
        "lightness": 65
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "poi",
      "stylers": [{
        "saturation": -100
      }, {
        "lightness": 51
      }, {
        "visibility": "simplified"
      }]
    }, {
      "featureType": "road.highway",
      "stylers": [{
        "saturation": -100
      }, {
        "visibility": "simplified"
      }]
    }, {
      "featureType": "road.arterial",
      "stylers": [{
        "saturation": -100
      }, {
        "lightness": 30
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "road.local",
      "stylers": [{
        "saturation": -100
      }, {
        "lightness": 40
      }, {
        "visibility": "on"
      }]
    }, {
      "featureType": "transit",
      "stylers": [{
        "saturation": -100
      }, {
        "visibility": "simplified"
      }]
    }, {
      "featureType": "administrative.province",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      }, {
        "lightness": -25
      }, {
        "saturation": -100
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "hue": "#ffff00"
      }, {
        "lightness": -25
      }, {
        "saturation": -97
      }]
    }]
  });

  directionsDisplay.setMap(map);

  var currentPositionMarker = new google.maps.Marker({
    position: currentPosition,
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      // fillColor: 'red',
      strokeColor: 'red',
      scale: 10
    },
    title: "Current position"
  });

  google.maps.event.addListener(currentPositionMarker, 'click', function() {
    infowindow.setContent("Current position: latitude: " + lat + " longitude: " + lon);
    infowindow.open(map, currentPositionMarker);
  });


  Strangers.find({}).observe({
    added: function(stranger) {
      var strangerPosition = new google.maps.LatLng(stranger.coordinates.lat, stranger.coordinates.lng);

      var strangerMarker = new google.maps.Marker({
        position: strangerPosition,
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10
        },
        animation: google.maps.Animation.DROP,
        title: stranger.user.fullname
      });
      google.maps.event.addListener(strangerMarker, 'click', function(event) {
        infowindow.setContent("<h1>" + strangerMarker.title + "</h1>");
        infowindow.open(map, strangerMarker);

        // calculate Route
        calculateRoute(event.latLng);

        // get venues
        getVenues({
          lat: currentLat,
          lon: currentLng
        });
      });
    }
  });
}

function getVenues(position) {
  // foursquare-id for Food
  Session.set('interest', '4d4b7105d754a06374d81259');

  Meteor.call('getVenues', position, Session.get('interest'), function(err, result) {
    Session.set('theVenues', JSON.parse(result.content).response.venues);
    addVenues();
  });
}

function addVenues() {
  var venues = Session.get('theVenues'),
    venueImage = '/img/coffee.png';
  for (var i = 0; i < venues.length; i++) {
    var venuePosition = new google.maps.LatLng(venues[i].location.lat, venues[i].location.lng);

    var venue = new google.maps.Marker({
      position: venuePosition,
      map: map,
      icon: venueImage,
      animation: google.maps.Animation.DROP,
      title: venues[i].name
    });

    google.maps.event.addListener(venue, 'click', function(event) {
      console.log(infowindow);
      // infowindow.setContent(venue.title);
      // infowindow.open(map, venue);
    });
  }

};


function locError(error) {
  // the current position could not be located
}

function locSuccess(position) {
  // initialize map with current position and calculate the route
  initializeMapAndCalculateRoute(position.coords.latitude, position.coords.longitude);
}

function calculateRoute(targetDestination) {
  if (currentPosition != '' && targetDestination != '') {

    var request = {
      origin: currentPosition,
      destination: targetDestination,
      travelMode: google.maps.DirectionsTravelMode["WALKING"]
    };

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setPanel(document.getElementById("directions"));
        directionsDisplay.setDirections(response);

        $('.navigation .btn').show();

        /*
                                var myRoute = response.routes[0].legs[0];
                                for (var i = 0; i < myRoute.steps.length; i++) {
                                    alert(myRoute.steps[i].instructions);
                                }
                            */
        // $("#results").show();
      } else {
        // $("#results").hide();
      }
    });
  } else {
    // $("#results").hide();
  }
}

Template.map.created = function() {

}

Template.map.events({
  'click .btn': function(event, template) {
    event.preventDefault();
    $('#map_canvas').toggleClass('open');
    $('#results').toggleClass('open');
  }
});


Template.map.rendered = function() {
  // find current position and on success initialize map and calculate the route
  navigator.geolocation.getCurrentPosition(locSuccess, locError);


};

Template.venues.helpers({
  venues: function() {
    return Session.get('theVenues');
  }
});