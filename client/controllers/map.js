// function initializeMapAndCalculateRoute(lat, lon) {

//   // var currentPositionMarker = new google.maps.Marker({
//   //   position: currentPosition,
//   //   map: map,
//   //   icon: {
//   //     path: google.maps.SymbolPath.CIRCLE,
//   //     // fillColor: 'red',
//   //     strokeColor: 'red',
//   //     scale: 10
//   //   },
//   //   title: "Current position"
//   // });


//   // google.maps.event.addListener(currentPositionMarker, 'click', function() {
//   //   infowindow.setContent("Current position: latitude: " + lat + " longitude: " + lon);
//   //   infowindow.open(map, currentPositionMarker);
//   // });

//   var fake = Fake.user({
//     fields: ['fullname', 'email'],
//   });

//   // Meteor.call('addStranger', currentLng, currentLat, fake, function(error, result) {
//   //   Session.set('currentId', result);
//   // });


//   Strangers.find({}).observe({
//     added: function(stranger, fields) {
//       var strangerPosition = new google.maps.LatLng(stranger.coordinates.lat, stranger.coordinates.lng);

//       var strangerMarker = new google.maps.Marker({
//         position: strangerPosition,
//         map: map,
//         icon: {
//           path: google.maps.SymbolPath.CIRCLE,
//           scale: 10
//         },
//         animation: google.maps.Animation.DROP,
//         title: stranger.user.fullname
//       });
//       if (!currentMarker) {
//         if (stranger._id == Session.get('currentId')) {
//           currentMarker = strangerMarker;
//         }
//       }
//       google.maps.event.addListener(strangerMarker, 'click', function(event) {
//         infowindow.setContent("<h1>" + strangerMarker.title + "</h1>");
//         infowindow.open(map, strangerMarker);

//         // calculate Route
//         //calculateRoute(event.latLng);

//         // get venues
//         // getVenues({
//         //   lat: currentLat,
//         //   lon: currentLng
//         // });
//       });
//     },
//     changed: function(stranger, fields) {

//     },
//     removed: function(stranger) {

//     }
//   });

// }

// function getVenues(position) {
//   // foursquare-id for Food
//   Session.set('interest', '4d4b7105d754a06374d81259');

//   Meteor.call('getVenues', position, Session.get('interest'), function(err, result) {
//     Session.set('theVenues', JSON.parse(result.content).response.venues);
//     addVenues();
//   });
// }

// function addVenues() {
//   var venues = Session.get('theVenues'),
//     venueImage = '/img/coffee.png';
//   for (var i = 0; i < venues.length; i++) {
//     var venuePosition = new google.maps.LatLng(venues[i].location.lat, venues[i].location.lng);

//     var venue = new google.maps.Marker({
//       position: venuePosition,
//       map: map,
//       icon: venueImage,
//       animation: google.maps.Animation.DROP,
//       title: venues[i].name
//     });

//     google.maps.event.addListener(venue, 'click', function(event) {
//       // console.log(infowindow);
//       // infowindow.setContent(venue.title);
//       // infowindow.open(map, venue);
//     });
//   }

// };


// function calculateRoute(targetDestination) {
//   if (currentPosition != '' && targetDestination != '') {

//     var request = {
//       origin: currentPosition,
//       destination: targetDestination,
//       travelMode: google.maps.DirectionsTravelMode["WALKING"]
//     };

//     directionsService.route(request, function(response, status) {
//       if (status == google.maps.DirectionsStatus.OK) {
//         directionsDisplay.setPanel(document.getElementById("directions"));
//         directionsDisplay.setDirections(response);

//         $('.navigation .btn').show();

//         /*
//                                 var myRoute = response.routes[0].legs[0];
//                                 for (var i = 0; i < myRoute.steps.length; i++) {
//                                     alert(myRoute.steps[i].instructions);
//                                 }
//                             */
//         // $("#results").show();
//       } else {
//         // $("#results").hide();
//       }
//     });
//   } else {
//     // $("#results").hide();
//   }
// }

function locationError(error) {
  // the current position could not be located
  console.log(error, 'error getting your location');
}

function locationSuccess(position) {
  // initialize map with current position and calculate the route
  gmaps.initialize(position);

  Meteor.users.find({
    "_id": {
      $ne: Meteor.user()._id
    }
  }).observe({
    added: function(user) {
      // console.log(user, '> just came online');
      gmaps.addMarker({
        lat: user.position.coords.latitude,
        lng: user.position.coords.longitude,
        _id: user.position.coords._id
      });
    },
    changed: function(user, fields) {
      console.log(user.position, '> just changed');
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
  'click .btn': function(event, template) {
    event.preventDefault();
    $('#map_canvas').toggleClass('open');
    $('#results').toggleClass('open');
  }
});

Template.map.rendered = function() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '//maps.google.com/maps/api/js?v=3&sensor=false&language=en&callback=googleMapsLoaded';
  document.body.appendChild(script);
};

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});