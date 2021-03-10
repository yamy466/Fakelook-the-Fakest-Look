import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";

const LocationMarker = ({ setSelectedLocation }) => {
  const map = useMapEvents({
    click({ latlng }) {
      setSelectedLocation(latlng);
    },
    locationfound({ latlng }) {
      setSelectedLocation(latlng);
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  return null;
};

export default LocationMarker;
