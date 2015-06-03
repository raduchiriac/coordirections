mapbox = {
  // map object
  map: null,

  // markers array
  markers: [],

  // mapbox markers layer
  markersLayer: null,

  // observer that watches for collection changes.
  // user observer.stop() to stop the Tracker
  observer: null,

  // HTML5 API watch position inside the browser
  navigatorWatchPositionHandler: null,

  // google lat lng objects
  // latLngs: [],

  // a circle representing the accuracy
  // markerAccuracy: null,

  // direction service
  // directionsService: null,

  // direction display
  // directionsDisplay: null,

  // define current marker
  currentMarker: null,

  //icons that are active should look this this
  defaultActiveIcon: null,

  // icons that are active should look this this
  defaultIdleIcon: null,

  // bounds of your map
  // mapBounds: null,

  /*
  calculateRoute: function (position, callback) {
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

    this.directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        this.gmaps.directionsDisplay.setPanel(document.getElementById("directions"));
        this.gmaps.directionsDisplay.setDirections(response);

        $('.navigation .meet').show();
      } else {}
    });

    try {
      callback();
    } catch (err) {}
  },

  removeRoute: function (username) {
    this.directionsDisplay.setMap(null);
    $('.navigation .meet').hide();

    if (!!username) {
      swal(username + " did not accept", "Try someone else", "error");
    }
  },

  insertConnection: function () {
    var fromPosition = gmaps.currentMarker.getPosition();
    Meteor.call('proposeANewConnection', {
      to: Session.get('strangerTo'),
      toUsername: Session.get('strangerToUsername'),
      from: Meteor.userId(),
      fromUsername: Meteor.user().username,
      fromPosition: {
        lat: fromPosition.lat(),
        lng: fromPosition.lng()
      }
    })
  },

  // calculate and move the bound box based on our markers
  calcBounds: function () {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, latLngLength = this.latLngs.length; i < latLngLength; i++) {
      bounds.extend(this.latLngs[i]);
    }
    this.map.fitBounds(bounds);
  },

  // check if a marker already exists
  markerExists: function (key, val) {
    _.each(this.markers, function (storedMarker) {
      if (storedMarker[key] == val)
        return true;
    });
    return false;
  },
  */

  setStatus: function (marker, idle) {
    marker.setIcon(!idle ? this.defaultActiveIcon : this.defaultIdleIcon);
  },

  // add a marker
  addMarker: function (document) {
    var marker = L.marker(document.coordinates, {
      data: {
        _id: document._id
      }
    });
    this.setStatus(marker, document.status.idle);
    marker.bindPopup('<h2>' + document.username + '</h2><button class="button" data-action="meet">Meet</button>').on('click', function (evt) {
      console.log(this.options.data._id);
    });
    marker.addTo(this.map);

    this.markers.push({
      marker: marker,
      _id: document._id
    });

    return marker;
  },

  // update marker
  changeMarker: function (id, coordinates, status) {
    var index = _.indexOf(_.pluck(this.markers, '_id'), id);
    try {
      this.markers[index].marker.setLatLng(L.latLng(coordinates[0], coordinates[1]));
      this.setStatus(this.markers[index].marker, status.idle);
    } catch (err) {
      console.log(err.message, '> changeMarker');
    }
  },

  // remove marker
  removeMarker: function (id) {
    var index = _.indexOf(_.pluck(this.markers, '_id'), id);
    var markerToDelete = this.markers[index].marker;

    this.map.removeLayer(markerToDelete)
    delete this.markers[index];

    return true;
  },

  // intialize the map
  initialize: function () {
    L.mapbox.accessToken = Meteor.settings.public.mapbox_public_token;
    this.map = L.mapbox.map("map", Meteor.settings.public.mapbox_map_id);
    this.markersLayer = L.mapbox.featureLayer().addTo(this.map);

    this.defaultActiveIcon = L.mapbox.marker.icon({
      'marker-size': 'large',
      'marker-symbol': 'cafe',
      'marker-color': '#f52'
    });
    this.defaultIdleIcon = L.mapbox.marker.icon({
      'marker-size': 'large',
      'marker-symbol': 'cafe',
      'marker-color': '#888'
    });

    var watchOptions = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    }
    this.navigatorWatchPositionHandler = navigator.geolocation.watchPosition(this.locationFound, this.locationError, watchOptions);

    this.observe();
    Session.set('mapbox', true);
    return true;
  },

  // location watch Success
  locationFound: function (position) {
    var currentPosition = [position.coords.latitude, position.coords.longitude];
    if (!mapbox.currentMarker) {
      var marker = L.marker(currentPosition);
      marker.addTo(mapbox.map);
      mapbox.currentMarker = marker;
      mapbox.map.setView(currentPosition, 13);
    } else {
      mapbox.currentMarker.setLatLng(L.latLng(currentPosition[0], currentPosition[1]));
      Meteor.call('updateUsersPosition', Meteor.user()._id, currentPosition);
    }
  },

  // location watch Error
  locationError: function () {
    console.log('> Position could not be found');
  },

  // observe collection Coordinates for changes
  observe: function () {
    var usersQuery = Meteor.users.find({
      "_id": {
        $ne: Meteor.userId()
      }
    })
    this.observer = usersQuery.observe({
      added: function (document) {
        // console.log(document, '> just came online');
        if (!!document.coordinates) {
          mapbox.addMarker(document);
        }
      },
      changed: function (newDocument, oldDocument) {
        mapbox.changeMarker(newDocument._id, newDocument.coordinates, newDocument.status);
      },
      removed: function (oldDocument) {
        // console.log(oldDocument, '> just went offline');
        mapbox.removeMarker(oldDocument._id);
      }
    });
  }
}
