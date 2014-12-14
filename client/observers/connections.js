Meteor.startup(function() {
  Connections.find({
    "from": {
      $ne: Meteor.userId()
    }
  }).observe({
    added: function(document) {
      connections.proposeRoute(document);
      return true;
    },
    changed: function(newDocument, oldDocument) {
      console.log(newDocument.route, '> proposed a new route');
      return true;
    },
    removed: function(oldDocument) {
      console.log(newDocument.route, '> removed route');
      return true;
    }
  });
});