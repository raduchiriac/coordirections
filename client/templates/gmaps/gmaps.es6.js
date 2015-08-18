"use strict"
Template.gmaps.helpers({
  gmapsOptions() {
    let currentPosition = Geolocation.latLng();
    if (GoogleMaps.loaded() && !!currentPosition) {
      return {
        center: new google.maps.LatLng(currentPosition.lat, currentPosition.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 18,
        disableDefaultUI: true,
        styles: gmaps_theme.styles
      };
    }
  }
});

Template.gmaps.onCreated(function () {
  GoogleMaps.ready(gmaps_theme.name, function (map) {
    gmaps.initialize(map);
  });
});
