'use strict';

Template.gmaps.helpers({
  gmapsOptions() {
    let currentPosition = Geolocation.latLng();
    console.log(GoogleMaps);
    if (GoogleMaps.loaded() && !!currentPosition) {
      console.log({
        center: new google.maps.LatLng(currentPosition.lat, currentPosition.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 18,
        disableDefaultUI: true,
        styles: gmaps_theme.styles
      });
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

// Template.gmaps.onCreated(function () {
//   GoogleMaps.ready(gmaps_theme.name, function (map) {
//     gmaps.initialize(map);
//     google.maps.event.addListener(map.instance, 'dragend', function (e) {
//       gmaps.getBox();
//     });

//     google.maps.event.addListener(map.instance, 'zoom_changed', function (e) {
//       gmaps.getBox();
//     });
//   });
// });
