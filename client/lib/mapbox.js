mapbox = {
  // map object
  map: null,

  // mapbox markers objects
  markers: [],

  // observer that watches for collection changes.
  // user observer.stop() to stop the Tracker
  observer: null,

  // google lat lng objects
  // latLngs: [],

  // a circle representing the accuracy
  // markerAccuracy: null,

  // direction service
  // directionsService: null,

  // direction display
  // directionsDisplay: null,

  // define current marker
  // currentMarker: null,

  // icons that are active should look this this
  // defaultActiveIcon: null,

  // icons that are active should look this this
  // defaultIdleIcon: null,

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

  changeMarker: function (id, position) {
    var index = _.indexOf(_.pluck(this.markers, '_id'), id);
    var gLatLng = new google.maps.LatLng(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude));
    try {
      this.markers[index].marker.setPosition(gLatLng);
    } catch (err) {
      console.log(err.message, '> change');
    }
  },

  toggleStatus: function (id, idle) {
    var index = _.indexOf(_.pluck(this.markers, '_id'), id);
    var theMarker = this.markers[index].marker;
    theMarker.setIcon(!!idle ? this.defaultIdleIcon : this.defaultActiveIcon);
  },

  removeMarker: function (id) {
    var index = _.indexOf(_.pluck(this.markers, '_id'), id);
    var markerToDelete = this.markers[index].marker;

    markerToDelete.setMap(null);
    delete this.markers[index];

    return true;
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

  updateCurrentPosition: function (position) {
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
  },*/

  // add a marker
  addMarker: function (document) {
    // var gLatLng = new google.maps.LatLng(parseFloat(marker.lat), parseFloat(marker.lng));
    // var markerIcon = marker.icon || this.defaultActiveIcon;
    // var gMarker = new google.maps.Marker({
    //   position: gLatLng,
    //   map: this.map,
    //   title: marker.title,
    //   // animation: google.maps.Animation.DROP,
    //   icon: markerIcon,
    //   member: {
    //     username: marker.username,
    //     _id: marker._id
    //   }
    // });

    // // this.latLngs.push(gLatLng);
    // this.markers.push({
    //   marker: gMarker,
    //   _id: marker._id
    // });

    // google.maps.event.addListener(gMarker, 'click', function (event) {
    //   if (gmaps.currentMarker != this) {
    //     Session.set('strangerTo', this.member._id);
    //     Session.set('strangerToUsername', this.member.username);
    //     gmaps.calculateRoute(this.position, gmaps.insertConnection);
    //     venues.getVenues(this.position);
    //   }
    // });

    var marker = L.marker(document.coordinates, {
      title: Coordinates.findOne({
        _id: document._id
      }).user().username
    }).addTo(this.map);

    return marker;
  },

  // intialize the map
  initialize: function () {
    L.mapbox.accessToken = Meteor.settings.public.mapbox_public_token;
    this.map = L.mapbox.map("map", Meteor.settings.public.mapbox_map_id);

    this.markers = L.mapbox.featureLayer().addTo(this.map);

    this.map.locate();
    this.map.on('locationfound', function (e) {
      //TODO: update users position with [e]
      mapbox.markers.setGeoJSON({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
          'title': 'Here I am!',
          'marker-color': '#ff8888',
          'marker-symbol': 'cafe'
        }
      });
      mapbox.map.setView([e.latitude, e.longitude], 13);
    });
    this.map.on('locationerror', function () {
      console.log('> Position could not be found');
    });

    this.observe();
    Session.set('mapbox', true);
    return true;
  },

  observe: function () {
    var coordinatesQuery = Coordinates.find({
      "userId": {
        $ne: Meteor.userId()
      }
    })
    this.observer = coordinatesQuery.observe({
      added: function (document) {
        // console.log(document, '> just came online');
        mapbox.addMarker(document);
      },
      changed: function (newDocument, oldDocument) {
        // CALL CHANGE POSITION
      },
      removed: function (oldDocument) {
        // console.log(oldDocument, '> just went offline');
        // CALL REMOVE
      }
    });
  }
}
