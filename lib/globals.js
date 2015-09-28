randomFromInterval = function (min, max) {
  return Math.random() * (max - min) + min;
};
giveRandomCoordinates = function (city) {
  switch (city) {
  case 'Paris':
    return {
      lat: randomFromInterval(48.82000001, 48.90000001),
      lng: randomFromInterval(2.26500001, 2.41040001),
    };
  default:
    return {};
  }
};
