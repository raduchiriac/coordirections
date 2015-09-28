ReactGoogleMaps = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    if (!!Session.get('box')) {
      subs.subscribe('usersInBounds', Session.get('box'));
    }
    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && this._mapOptions()
    };
  },
  _mapOptions() {
    let currentPosition = Geolocation.latLng(),
      options = {
        center: currentPosition ? new google.maps.LatLng(currentPosition.lat, currentPosition.lng) : undefined,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 18,
        disableDefaultUI: true,
        styles: CONST_DATA.MapsHolder.styles
      };
    return options;
  },
  render() {
    if (!!this.data.loaded && this.data.mapOptions.center) {
      return <GoogleMap name={CONST_DATA.MapsHolder.name} options={this.data.mapOptions} />;
    }

    return <Loading />;
  }
});

GoogleMap = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired
  },
  componentDidMount() {
    GoogleMaps.create({
      name: this.props.name,
      element: React.findDOMNode(this),
      options: this.props.options
    });

    GoogleMaps.ready(this.props.name, function (map) {
      MapsHolder.initialize(map);
    });
  },
  render() {
    return <div className="map-container"></div>;
  }
});
