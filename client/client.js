var map,
  currentPosition,
  directionsDisplay,
  directionsService,
  destinationLatitude = 48.8675030,
  destinationLongitude = 2.3638110,
  infowindow;

function initializeMapAndCalculateRoute(lat, lon) {
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();

  currentPosition = new google.maps.LatLng(lat, lon);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 15,
    center: currentPosition,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  directionsDisplay.setMap(map);

  var currentPositionMarker = new google.maps.Marker({
    position: currentPosition,
    map: map,
    title: "Current position"
  });

  // current position marker info
  /*
                var infowindow = new google.maps.InfoWindow();
                google.maps.event.addListener(currentPositionMarker, 'click', function() {
                    infowindow.setContent("Current position: latitude: " + lat +" longitude: " + lon);
                    infowindow.open(map, currentPositionMarker);
                });
                */

  // calculate Route
  calculateRoute();

  // get venues
  getVenues({
    lat: lat,
    lon: lon
  });
}

function getVenues(position) {
  Session.set('interest', 'bar');

  Meteor.call('getVenues', position, Session.get('interest'), function(err, result) {
    Session.set('theVenues', JSON.parse(result.content).response.venues);
    addVenues();
  });
}

function addVenues() {
  var venues = Session.get('theVenues'),
    venue, venuePosition, venueImage = '/img/coffee.png';
  for (var i = 0; i < venues.length; i++) {
    venuePosition = new google.maps.LatLng(venues[i].location.lat, venues[i].location.lng);
    venue = new google.maps.Marker({
      position: venuePosition,
      map: map,
      icon: venueImage,
      animation: google.maps.Animation.DROP,
      title: venues[i].name
    });
    google.maps.event.addListener(venue, 'click', function(event) {
      //map.setCenter(new google.maps.LatLng(venue.position.lat(), venue.position.lng()));
      //map.setZoom(18);
      //onItemClick(event, venue);
    });

    function onItemClick(event, pin) {
      // Create content 
      var contentString = pin.title;

      // Replace our Info Window's content and position 
      infowindow.setContent(contentString);
      infowindow.setPosition(pin.position);
      infowindow.open(map);
    }
  }

};

function locError(error) {
  // the current position could not be located
}

function locSuccess(position) {
  // initialize map with current position and calculate the route
  initializeMapAndCalculateRoute(position.coords.latitude, position.coords.longitude);
}

function calculateRoute() {

  var targetDestination = new google.maps.LatLng(destinationLatitude, destinationLongitude);
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

        /*
                                var myRoute = response.routes[0].legs[0];
                                for (var i = 0; i < myRoute.steps.length; i++) {
                                    alert(myRoute.steps[i].instructions);
                                }
                            */
        $("#results").show();
      } else {
        $("#results").hide();
      }
    });
  } else {
    $("#results").hide();
  }
}

Template.map.rendered = function() {
  // find current position and on success initialize map and calculate the route
  navigator.geolocation.getCurrentPosition(locSuccess, locError);
};

Template.venues.helpers({
  venues: function() {
    return Session.get('theVenues');
  }
});