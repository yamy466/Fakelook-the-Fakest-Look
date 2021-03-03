import { useMap } from "react-leaflet";
import { useEffect } from "react";

function RecenterMap(props) {
  const map = useMap();
  const defaultLocation = props.default;

  useEffect(() => {
    getCurrentLocation();
  }, [map]);

  const getCurrentLocation = () =>
    navigator.geolocation.getCurrentPosition(success, error, options);

  const success = (position) => flyTo(position.coords);

  const error = () => {
    flyTo(defaultLocation);
    alert("Could not determine your current location");
  };

  const options = () => {
    return {
      enableHighAccuracy: false,
      timeout: 5000,
    };
  };

  const flyTo = (location) =>
    map.flyTo([location.latitude, location.longitude], 16);

  return null;
}
export default RecenterMap;
