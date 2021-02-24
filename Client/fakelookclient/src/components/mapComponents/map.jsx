import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";

class FakelookMap extends Component {
  render() {
    return (
      <MapContainer
        className="map"
        center={[32.09754044645131, 34.826256097397454]}
        zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    );
  }
}

export default FakelookMap;
//32.09754044645131 34.826256097397454
