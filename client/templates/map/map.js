Template.map.onRendered(function () {
  Mapbox.load('minimap', 'markercluster', 'directions');

  Tracker.autorun(function () {
    if (Mapbox.loaded()) {
      mapbox.initialize();
    }
  });
});


/*
function locationSuccess(position) {
  // initialize map with current position and calculate the route
  gmaps.initialize(position);


}

Template.map.events({
  'click .meet': function(event, template) {
    event.preventDefault();
    $('#map_canvas').toggleClass('open');
    $('.results').toggleClass('open');
  }
});

*/
