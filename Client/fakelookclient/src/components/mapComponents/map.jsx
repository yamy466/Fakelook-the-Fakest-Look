import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
    let options;
    return (options = {
      enableHighAccuracy: false,
      timeout: 5000,
    });
  }

  function flyTo(location) {
    // map.flyTo([location.latitude, location.longitude], 16);
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
        ref={mapRef}
        className="map"
        center={[center.latitude, center.longitude]}
        zoom={15}>
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
