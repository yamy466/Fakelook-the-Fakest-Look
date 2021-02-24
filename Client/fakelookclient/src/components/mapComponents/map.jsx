import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";

class FakelookMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 32.09754044645131,
      longitude: 34.826256097397454,
    };
  }

  getAllLocations = () => {
    const locations = [
      this.createLocation(32.157658, 34.822759),
      this.createLocation(32.162580580196845, 34.806576938890494),
      this.createLocation(32.162637168702574, 34.81450406550532),
    ];
    return locations;
  };

  createLocation = (lat, lon) => {
    const location = { lat: lat, lon: lon };
    return location;
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.success,
      this.error,
      this.options
    );
  }

  success = (position) => {
    let crds = position.coords;
    this.setState({
      latitude: crds.latitude,
      longitude: crds.longitude,
    });
    console.log("ok did it", crds.longitude, "long");
  };

  error = () => {
    this.setState({
      latitude: 32.09754044645131,
      longitude: 34.826256097397454,
    });
    console.log("failed");
  };

  options = () => {
    let options;
    return (options = {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  };

  renderLocations = () => {
    let locations = this.getAllLocations();
    return locations.map((location, index) => {
      return (
        <Marker position={location}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      );
    });
  };

  renderMap = () => {
    const { latitude, longitude } = this.state;
    return (
      <MapContainer className="map" center={[latitude, longitude]} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.renderLocations()}
      </MapContainer>
    );
  };

  render() {
    return <div>{this.renderMap()}</div>;
  }
}

export default FakelookMap;
//32.09754044645131 34.826256097397454
