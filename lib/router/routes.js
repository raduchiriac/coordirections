var subs = new SubsManager();

Router.route('/', function () {
  this.layout(Session.get('layout') || 'layout');

  this.render('home', {
    name: 'home',
    controller: 'ApplicationController',
    action: 'show'
  });

  this.render('footer', {
    to: 'footer'
  });
});

Router.route('/map', {
  subscriptions: function () {
    return Meteor.subscribe('usersInBounds');
  },
  data: function () {
    return {
      coordinates: Coordinates.find({})
    }
  },
  action: function () {
    if (this.ready()) {
      this.render('map');
    } else {
      this.render('loading');
    }
  }
});

Router.route('/login');

/*
Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render('login');
  } else {
    this.next();
  }
});
*/

/*
Router.route('/subscriptions', {
  waitOn: function () {
    return Meteor.subscribe('post');
  },

  action: function () {
    if (this.ready())
      // if the sub handle returned from waitOn ready() method returns
      // true then we're ready to go ahead and render the page.
      this.render('Page')
    else
      // otherwise render the loading template.
      this.render('Loading');
  }
});

myReadyVar = new Blaze.ReactiveVar(false);
Router.route('/custom', {
  waitOn: function () {
    return function () {
      // returns true or false
      // and can bet set with myReadyVar.set(true|false);
      return myReadyVar.get();
    };
  },

  action: function () {
    if (this.ready())
      this.render('Page')
    else
      this.render('LoadingCustom');
  }
});

one = new Blaze.ReactiveVar(false);
two = new Blaze.ReactiveVar(false);
Router.route('/many', {
  waitOn: function () {
    // we'll be ready when both one and two are true.
    return [
      function () { return one.get(); },
      function () { return two.get(); }
    ];
  },

  action: function () {
    if (this.ready())
      this.render('Page')
    else
      this.render('LoadingMany');
  }
});
*/
