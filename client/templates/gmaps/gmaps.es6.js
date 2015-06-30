Template.gmaps.helpers({
  mapOptions() {
    let currentPosition = Geolocation.latLng();
    if (GoogleMaps.loaded() && !!currentPosition) {
      return {
        center: new google.maps.LatLng(currentPosition.lat, currentPosition.lng),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
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
