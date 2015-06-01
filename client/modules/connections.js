// Meteor.startup(function() {
//   Connections.find({
//     "from": {
//       $ne: Meteor.userId()
//     }
//   }).observe({
//     added: function(document) {
//       connections.proposeRoute(document);
//       return true;
//     },
//     changed: function(newDocument, oldDocument) {
//       console.log(newDocument, '> proposed a new route');
//       return true;
//     },
//     removed: function(document) {
//       // console.log(document, '> removed route');
//       gmaps.removeRoute()
//       return true;
//     }
//   });

//   Connections.find({
//     "from": Meteor.userId()
//   }).observe({
//     removedAt: function(oldDocument, atIndex) {
//       gmaps.removeRoute(oldDocument.toUsername);
//     }
//   });
// });
