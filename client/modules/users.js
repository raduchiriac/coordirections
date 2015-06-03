Tracker.autorun(function () {
  try {
    UserStatus.startMonitor({
      threshold: 30000,
      idleOnBlur: true
    });

    c.stop();
  } catch (ignore) {}
})
