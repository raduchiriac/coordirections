FlowRouter.notFound = {
  action: function () {
    BlazeLayout.render('blazeMasterLayout', {
      main: "404"
    });
  }
};
