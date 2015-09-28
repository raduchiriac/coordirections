FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);
FlowRouter.route('/', {
  name: 'react',
  action: function () {
    GoogleMaps.load();
    ReactLayout.render(reactMainLayout, {
      content() {
        return <ReactGoogleMaps />;
      }
    });
  }
});
