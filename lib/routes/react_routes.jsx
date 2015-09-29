FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);
FlowRouter.route('/', {
  name: 'ReactGoogleMaps',
  action: function () {
    GoogleMaps.load();
    ReactLayout.render(reactMainLayout, {
      content() {
        return <ReactGoogleMaps />;
      }
    });
  }
});
