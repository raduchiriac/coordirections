"use strinct";

MapsHolder = {
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
  addMarker(doc) {
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(doc.location.coordinates.lat, doc.location.coordinates.lng),
      map: this.map,
      id: doc._id
    });
    this.markers[doc._id] = marker;
  },

  // update marker
  changeMarker(doc) {
    this.markers[doc._id].setPosition(new google.maps.LatLng(doc.location.coordinates.lat, doc.location.coordinates.lng));
  },

  // remove marker
  removeMarker(doc) {
    this.markers[doc._id].setMap(null);
    delete this.markers[doc._id];
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
        strokeColor: CONST_DATA.MapsHolder.marker_color,
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
      MapsHolder.calculateBounds();
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
    if (!!MapsHolder.currentMarker) {
      MapsHolder.currentMarker.setPosition(currentPosition);
      Meteor.call('updateUsersPosition', Meteor.userId(), currentPosition);
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
      added: function (doc) {
        if (!!doc.location.coordinates) {
          MapsHolder.addMarker(doc);
        }
      },
      changed: function (newdoc, olddoc) {
        MapsHolder.changeMarker(newdoc);
      },
      removed: function (olddoc) {
        MapsHolder.removeMarker(olddoc);
      }
    });
  }
};
