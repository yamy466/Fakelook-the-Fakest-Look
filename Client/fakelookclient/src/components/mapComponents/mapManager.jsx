import { useMap } from "react-leaflet";
import React, { useEffect } from "react";

function RecenterMap(props) {
  const map = useMap();
  const defaultLocation = props.default;

  useEffect(() => {
    getCurrentLocation();
  }, [map]);

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  function success(position) {
    flyTo(position.coords);
    console.log("ok did it");
  }

  function error() {
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
    map.flyTo([location.latitude, location.longitude], 16);
  }
}

export default RecenterMap;
