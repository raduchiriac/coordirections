connections = {
  proposeRoute: function(connection) {
    var fromPosition = new google.maps.LatLng(connection.fromPosition.k, connection.fromPosition.D);
    gmaps.calculateRoute(fromPosition, undefined);
    return true;
  }
}