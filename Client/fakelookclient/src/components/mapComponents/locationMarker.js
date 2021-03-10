import { connect } from 'react-redux'
import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import {selectLocation} from "../../actions"

const LocationMarker = (props) => {
  const map = useMapEvents({
    click({ latlng }) {
      props.selectLocation(latlng);
    },
    locationfound({ latlng }) {
      props.selectLocation(latlng);
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  return null;
};

export default connect(null,{selectLocation})(LocationMarker);
