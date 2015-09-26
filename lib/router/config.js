// Router.configure({
//   layoutTemplate: 'layoutSimple',
//   notFoundTemplate: 'notFound',
//   loadingTemplate: 'loading',
//   progressSpinner: false,
// });

// Router.plugin('ensureSignedIn', {
//   except: ['login'],
//   template: 'login',
// });

// Router.onBeforeAction(function () {
//   GoogleMaps.load({
//     v: '3',
//     key: Meteor.settings.public.gmaps_api,
//   });
//   this.next();
// }, {
//   only: ['gmaps']
// });
