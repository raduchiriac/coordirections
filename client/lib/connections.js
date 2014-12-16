connections = {
  proposeRoute: function(connection) {
    var fromPosition = new google.maps.LatLng(connection.fromPosition.lat, connection.fromPosition.lng);
    gmaps.calculateRoute(fromPosition, undefined);

    swal({
      title: connection.fromUsername + " wants to see you for a coffee",
      text: "You can accept or deny his request.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Meet",
      cancelButtonText: "Busy",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm) {
      if (isConfirm) {
        swal("Walk!", "Let's look for a coffee shop", "success");
      } else {
        Meteor.call('removeASpecificConnection', connection.from, connection.to);
        swal("It looks like you are busy", "See you next time", "error");
      }
    });
    return true;
  }
}