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

  calculateRoute: function(position, callback) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });

    this.directionsDisplay.setMap(this.map);

    var request = {
      origin: this.currentMarker.position,
      destination: position,
      travelMode: google.maps.DirectionsTravelMode["WALKING"]
    };

    this.directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        this.gmaps.directionsDisplay.setPanel(document.getElementById("directions"));
        this.gmaps.directionsDisplay.setDirections(response);

        $('.navigation .btn').show();
      } else {}
    });

    try {
      callback();
    } catch (err) {}
  },

  insertConnection: function() {
    log = Connections.insert({
      timestamp: new Date().getTime(),
      to: Session.get('strangerTo'),
      from: Meteor.userId(),
      fromPosition: gmaps.currentMarker.position
    });
  },

  // add a marker given our formatted marker data object
  addMarker: function(marker) {
    var gLatLng = new google.maps.LatLng(parseFloat(marker.lat), parseFloat(marker.lng));
    var markerIcon = marker.icon || {
      path: google.maps.SymbolPath.CIRCLE,
      strokeColor: 'darkblue',
      scale: 10
    };
    var gMarker = new google.maps.Marker({
      position: gLatLng,
      map: this.map,
      title: marker.title,
      // animation: google.maps.Animation.DROP,
      icon: markerIcon,
      member: {
        username: marker.username,
        _id: marker._id
      }
    });

    // this.latLngs.push(gLatLng);
    this.markers.push({
      marker: gMarker,
      _id: marker._id
    });

    google.maps.event.addListener(gMarker, 'click', function(event) {
      if (gmaps.currentMarker != this) {
        Session.set('strangerTo', this.member._id);
        gmaps.calculateRoute(this.position, gmaps.insertConnection);
        venues.getVenues(this.position);
      }
    });

    return gMarker;
  },

  changeMarker: function(id, position) {
    var index = _.indexOf(_.pluck(this.markers, '_id'), id);
    var gLatLng = new google.maps.LatLng(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude));
    try {
      this.markers[index].marker.setPosition(gLatLng);
    } catch (err) {
      console.log(err.message, '> change');
    }
  },

  removeMarker: function(id) {
    var index = _.indexOf(_.pluck(this.markers, '_id'), id);
    var markerToDelete = this.markers[index].marker;

    markerToDelete.setMap(null);
    delete this.markers[index];

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
      this.gmaps.markerAccuracy.setRadius(parseInt(position.coords.accuracy));
      position = {
        coords: {
          accuracy: position.coords.accuracy.toString(),
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString()
        }
      };
      Meteor.call('updateUsersPosition', position);
    } catch (err) {
      console.log(err.message, '> update');
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
      _id: Meteor.userId()
    });

    position = {
      coords: {
        accuracy: position.coords.accuracy.toString(),
        latitude: position.coords.latitude.toString(),
        longitude: position.coords.longitude.toString()
      }
    };

    Meteor.call('updateUsersPosition', position);
    Meteor.call('removeAllMyPreviousRoutes', Meteor.userId());

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