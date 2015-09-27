FlowRouter.route('/react', {
  name: 'react',
  action: function () {
    GoogleMaps.load();
    ReactLayout.render(MainLayout, {
      content() {
        return <MyTestMap />;
      }
    });
  }
});
