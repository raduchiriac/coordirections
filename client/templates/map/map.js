Template.map.onRendered(function () {
  Mapbox.load('minimap', 'markercluster', 'directions');

  Tracker.autorun(function () {
    if (Mapbox.loaded()) {

      console.log('> mapbox loaded');
      L.mapbox.accessToken = Meteor.settings.public.mapbox_public_token;
      var map = L.mapbox.map("map", Meteor.settings.public.mapbox_map_id);

      var myLayer = L.mapbox.featureLayer().addTo(map);
      map.locate();

      map.on('locationfound', function (e) {
        // map.fitBounds(e.bounds);

        myLayer.setGeoJSON({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
          },
          properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
          }
        });
        map.setView([e.latitude, e.longitude], 13);

      });

      // If the user chooses not to allow their location
      // to be shared, display an error message.
      map.on('locationerror', function () {
        geolocate.innerHTML = 'Position could not be found';
      });
    }
  });
});
