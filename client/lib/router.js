Router.configure({
  layoutTemplate: 'layout'
});

Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    this.redirect('login');
  } else {
    this.next();
  }
}, {
  except: ['login']
});

Router.map(function() {
  this.route('map', {
    path: '/',
    // waitOn: function() {
    //   return [IRLibLoader.load('http://maps.google.com/maps/api/js?v=3&sensor=false&language=en')]
    // },
    before: [],
    data: function() {
      return Strangers.findOne();
    }
  });
  this.route('login', {
    path: '/login'
  })
})