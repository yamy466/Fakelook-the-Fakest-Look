import React, { Component } from "react";
import { Map } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export default class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 0,
          lng: 0,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "PUT YOUR KEY HERE",
})(MapContainer);
