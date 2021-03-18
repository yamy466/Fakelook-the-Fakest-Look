import { useMap } from "react-leaflet";
import { useEffect } from "react";
import getUsersLocation from "../../helpers/getUsersLocation";

function RecenterMap(props) {
  const map = useMap();
  const defaultLocation = props.default;

  useEffect(() => {
    getUsersLocation(flyTo,defaultLocation);
  }, []);

  const flyTo = (location) =>
    map.flyTo([location.latitude || location.lat, location.longitude || location.lng], 16);

  return null;
}
export default RecenterMap;
