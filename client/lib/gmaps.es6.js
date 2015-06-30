gmaps = {
  // map object
  map: null,

  // markers array
  markers: [],

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

  // calculate and move the bound box based on our markers
  calcBounds() {},

  // check if a marker already exists
  markerExists(key, val) {},

  setStatus() {},

  // add a marker
  addMarker(document) {},

  // update marker
  changeMarker(id, coordinates, status) {},

  // remove marker
  removeMarker(id) {},

  // intialize the map
  initialize(map) {
    let currentPosition = map.options.center;

    this.map = map.instance
    this.currentMarker = new google.maps.Marker({
      position: currentPosition,
      map: this.map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: gmaps_theme.marker_color,
        scale: 14
      },
      title: "Current position"
    });
  },

  // location watch Success
  locationFound(position) {},

  // location watch Error
  locationError() {
    console.log('> Position could not be found');
  },

  // observe collection Coordinates for changes
  observe() {
    var usersQuery = Meteor.users.find({
      "_id": {
        $ne: Meteor.userId()
      }
    })
    this.observer = usersQuery.observe({
      added: function (document) {
        // console.log(document, '> just came online');
        if (!!document.coordinates) {
          gmaps.addMarker(document);
        }
      },
      changed: function (newDocument, oldDocument) {
        gmaps.changeMarker(newDocument._id, newDocument.coordinates, newDocument.status);
      },
      removed: function (oldDocument) {
        // console.log(oldDocument, '> just went offline');
        gmaps.removeMarker(oldDocument._id);
      }
    });
  }
}
