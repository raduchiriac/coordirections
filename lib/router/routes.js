subs = new SubsManager();

FlowRouter.route('/', {
  name: 'home',
  action: function () {
    GoogleMaps.load();
    BlazeLayout.render("mainLayout", {
      main: "gmaps"
    });
  }
});
