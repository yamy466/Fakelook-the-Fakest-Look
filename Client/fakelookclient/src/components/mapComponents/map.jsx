import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import RecenterMap from "./mapManager";
import Post from "../../models/post";
import customIcon from "./CustomIcon";
import "./map.css";

const FakelookMap = () => {
  const defaultLocation = {
    latitude: 32.09754044645131,
    longitude: 34.826256097397454,
  };

  const getAllPosts = () => {
    const posts = [
      new Post(
        1,
        1,
        2,
        32.177658,
        34.822759,
        "first post",
        [1, 2],
        {},
        ["new"],
        []
      ),
      new Post(
        1,
        1,
        2,
        32.157658,
        34.822759,
        "second post",
        [3, 4],
        {},
        ["friday"],
        []
      ),
      new Post(
        1,
        1,
        2,
        32.127658,
        34.822759,
        "third post",
        [5, 6],
        {},
        ["resturant"],
        []
      ),
    ];
    return posts;
  };

  const createLocation = ({ latitude, longitude }) => {
    return { lat: latitude, lon: longitude };
  };

  const renderLocations = () => {
    let posts = getAllPosts();
    return posts.map((post, index) => {
      return (
        <Marker icon={customIcon()} position={createLocation(post)}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      );
    });
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
        {renderLocations()}
      </MapContainer>
    );
  }

  return <div>{renderMap()}</div>;
};

export default FakelookMap;
//32.09754044645131 34.826256097397454
