gmaps = {
  // map object
  map: null,

  // google markers objects
  markers: [],

  // google lat lng objects
  latLngs: [],

  // a circle representing the accuracy
  markerAccuracy: null,

  // direction service
  directionsService: null,

  // direction display
  directionsDisplay: null,

  // define current marker
  currentMarker: null,

  // add a marker given our formatted marker data object
  addMarker: function(marker) {
    var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);
    var gMarker = new google.maps.Marker({
      position: gLatLng,
      map: this.map,
      title: marker.title,
      // animation: google.maps.Animation.DROP,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: 'darkblue',
        scale: 10
      },
    });
    console.log(marker._id);
    this.latLngs.push(gLatLng);
    this.markers.push({
      marker: gMarker,
      _id: marker._id
    });

    return gMarker;
  },

  removeMarker: function(id) {
    return true;
  },

  // calculate and move the bound box based on our markers
  calcBounds: function() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, latLngLength = this.latLngs.length; i < latLngLength; i++) {
      bounds.extend(this.latLngs[i]);
    }
    this.map.fitBounds(bounds);
  },

  // check if a marker already exists
  markerExists: function(key, val) {
    _.each(this.markers, function(storedMarker) {
      if (storedMarker[key] == val)
        return true;
    });
    return false;
  },

  updateCurrentPosition: function(position) {
    var newLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    try {
      this.gmaps.currentMarker.setPosition(newLatlng);
      //this.gmaps.map.setCenter(newLatlng);
      this.gmaps.markerAccuracy.setCenter(newLatlng);
      this.gmaps.markerAccuracy.setRadius(parseInt(position.coords.accuracy, 10));


      Meteor.call('updateUser', position);
    } catch (err) {
      console.log(err.message);
    }
  },

  // intialize the map
  initialize: function(position) {
    var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      zoom: 16,
      center: currentPosition,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      panControl: false,
      zoomControl: false,
      scaleControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      overviewMapControl: false,
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
          "visibility": "off"
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
    }

    this.map = new google.maps.Map(
      document.getElementById('map_canvas'),
      mapOptions
    );

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });
    this.directionsDisplay.setMap(this.map);

    console.log(position.coords.accuracy, '> init, accuracy');

    this.markerAccuracy = new google.maps.Circle({
      center: currentPosition,
      radius: position.coords.accuracy,
      fillColor: "#c4d4e4",
      fillOpacity: 0.5,
      strokeOpacity: 0,
      strokeWeight: 0,
      map: this.map
    });

    this.currentMarker = this.addMarker({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      _id: Meteor.user()._id
    });

    Meteor.call('updateUser', position);

    // Observe position changements
    try {
      navigator.geolocation.watchPosition(this.updateCurrentPosition, function(error) {}, {
        timeout: 5000,
        maximumAge: 600000,
        enableHighAccuracy: true
      });
    } catch (err) {

    }

    // global flag saying we intialized already
    Session.set('map', true);

    return true;
  }
}