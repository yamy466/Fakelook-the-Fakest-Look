import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import RecenterMap from "./mapManager";
import "./map.css";

const FakelookMap = () => {
  const defaultLocation = {
    latitude: 32.09754044645131,
    longitude: 34.826256097397454,
  };

  function getAllLocations() {
    const locations = [
      createLocation(32.157658, 34.822759),
      createLocation(32.162580580196845, 34.806576938890494),
      createLocation(32.162637168702574, 34.81450406550532),
    ];
    return locations;
  }

  function createLocation(lat, lon) {
    const location = { lat: lat, lon: lon };
    return location;
  }

  function renderLocations() {
    let locations = getAllLocations();
    return locations.map((location, index) => {
      return (
        <Marker position={location}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      );
    });
  }

  function renderMap() {
    return (
      <MapContainer
        className="map"
        center={[defaultLocation.latitude, defaultLocation.longitude]}
        zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <RecenterMap default={defaultLocation} />
        {renderLocations()}
      </MapContainer>
    );
  }

  return <div>{renderMap()}</div>;
};

export default FakelookMap;
//32.09754044645131 34.826256097397454
