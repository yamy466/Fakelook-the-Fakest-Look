import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Post from "../../models/post";
import customIcon from "./CustomIcon";
import "./map.css";

const FakelookMap = () => {
  const defaultLocation = {
    latitude: 32.09754044645131,
    longitude: 34.826256097397454,
  };
  const [center, setCenter] = useState({
    latitude: 32.09754044645131,
    longitude: 34.826256097397454,
  });
  const mapRef = useRef();

  useEffect(() => {
    console.log(mapRef, "Mapppp");
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    getCurrentLocation();
  }, [mapRef]);

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

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  function success(position) {
    let crds = position.coords;
    let newCenter = { latitude: crds.latitude, longitude: crds.longitude };
    setCenter(newCenter);
    flyTo(crds);
    console.log("ok did it");
  }

  function error() {
    setCenter(defaultLocation);
    flyTo(defaultLocation);
    alert("Could not determine your current location");
  }

  function options() {
    return {
      enableHighAccuracy: false,
      timeout: 5000,
    };
  }

  function flyTo(location) {
    // map.flyTo([location.latitude, location.longitude], 16);
  }

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
        ref={mapRef}
        className="map"
        center={[center.latitude, center.longitude]}
        zoom={15}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {renderLocations()}
      </MapContainer>
    );
  }

  return <div>{renderMap()}</div>;
};

export default FakelookMap;
//32.09754044645131 34.826256097397454
