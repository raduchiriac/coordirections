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
    before: [],
    data: {}
  });
  this.route('friends', {
    path: '/friends',
    before: [],
    data: {
      myFriends: function() {
        return Friends.find();
      }
    }
  })
  this.route('login', {
    path: '/login',
    onBeforeAction: function() {
      if (Meteor.userId()) {
        this.redirect('/');
      } else {
        this.next();
      }
    }
  })
});