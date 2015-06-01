Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  progressSpinner: false,
});

//*
// AUTH
Router.plugin('ensureSignedIn', {
  except: ['login'],
  template: 'login',
});
//*/
