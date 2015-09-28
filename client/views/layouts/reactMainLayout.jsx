reactMainLayout = React.createClass({
  render() {
    return <div id="main-layout">
        {this.props.content()}
    </div>
  }
});
