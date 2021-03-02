import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import RecenterMap from "./mapRecenter";
import "./map.css";
import ShowPosts from "./showPosts";

const FakelookMap = () => {
  const defaultLocation = {
    latitude: 32.09754044645131,
    longitude: 34.826256097397454,
  };

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
        <ShowPosts />
      </MapContainer>
    );
  }

  return <div>{renderMap()}</div>;
};

export default FakelookMap;
//32.09754044645131 34.826256097397454
