"use strinct";

gmaps = {
  // map object
  map: null,

  // markers object
  markers: {},

  // observer that watches for collection changes.
  // user observer.stop() to stop the Tracker
  observer: null,

  // HTML5 API watch position inside the browser
  navigatorWatchPositionHandler: null,

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

  //icons that are active should look this this
  defaultActiveIcon: null,

  // icons that are active should look this this
  defaultIdleIcon: null,

  // bounds of your map
  mapBounds: null,

  calculateRoute(position, callback) {},

  removeRoute(username) {},

  insertConnection() {},

  // check if a marker already exists
  markerExists(key, val) {},

  setStatus() {},

  // add a marker
  addMarker(document) {
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(document.location.coordinates.lat, document.location.coordinates.lng),
      map: this.map,
      id: document._id
    });
    this.markers[document._id] = marker;
  },

  // update marker
  changeMarker(id, coordinates) {},

  // remove marker
  removeMarker(document) {
    this.markers[document._id].setMap(null);
    delete this.markers[document._id];
  },

  // intialize the map
  initialize(map) {
    "use strict";
    let currentPosition = map.options.center,
      watchOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    this.map = map.instance;
    this.currentMarker = new google.maps.Marker({
      position: currentPosition,
      map: this.map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: gmaps_theme.marker_color,
        scale: 10
      },
    });
    this.navigatorWatchPositionHandler = navigator.geolocation.watchPosition(this.locationFound, this.locationError, watchOptions);
    this.addEvents();
    this.calculateBounds();
    this.observe();
  },

  addEvents() {
    this.map.addListener('bounds_changed', function () {
      gmaps.calculateBounds();
    });
  },

  calculateBounds() {
    var bounds = this.map.getBounds();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();
    bounds = [
      [sw.lat(), sw.lng()],
      [ne.lat(), ne.lng()]
    ];
    Session.set('box', bounds);
    return bounds;
  },

  // location watch Success
  locationFound(position) {
    var currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    if (gmaps.currentMarker) {
      gmaps.currentMarker.setPosition(currentPosition);
      // Meteor.call('updateUsersPosition', Meteor.user()._id, currentPosition);
    }
  },

  // location watch Error
  locationError() {
    // console.log('> Position could not be found');
  },

  // observe collection Coordinates for changes
  observe() {
    var usersQuery = Users.find({
      "_id": {
        $ne: Meteor.userId()
      }
    });
    this.observer = usersQuery.observe({
      added: function (document) {
        // console.log(document, '> just came online');
        if (!!document.location.coordinates) {
          gmaps.addMarker(document);
        }
      },
      changed: function (newDocument, oldDocument) {
        gmaps.changeMarker(newDocument._id, newDocument.coordinates, newDocument.status);
      },
      removed: function (oldDocument) {
        // console.log(oldDocument, '> just went offline');
        gmaps.removeMarker(oldDocument);
      }
    });
  }
}
