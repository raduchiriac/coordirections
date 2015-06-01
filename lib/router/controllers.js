// if (Meteor.isClient) {
//   ApplicationController = RouteController.extend({
//     layoutTemplate: 'layout',

//     onBeforeAction: function () {
//       console.log('app before hook!');
//       this.next();
//     },

//     action: function () {
//       console.log('this should be overridden!');
//     }
//   });

//   HomeController = ApplicationController.extend({
//     action: function () {
//       this.render('Home');
//     }
//   });

//   PostController = ApplicationController.extend({
//     show: function () {
//       this.render('PostShow');
//     },

//     index: function () {
//       this.render('PostIndex');
//     }
//   });
// }
