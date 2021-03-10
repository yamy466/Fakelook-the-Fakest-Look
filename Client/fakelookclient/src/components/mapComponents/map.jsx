import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import RecenterMap from "./mapRecenter";
import "./map.css";
import ShowPosts from "./showPosts";
import LocationMarker from "./locationMarker";
import {connect} from "react-redux"
import { Button } from "semantic-ui-react";
import MyLocation from "./MyLocation.jsx";

const FakelookMap = (props) => {
  const defaultLocation = [32.09754044645131, 34.826256097397454];

  function renderMap() {
    return (
      <MapContainer name="map" className="map" center={defaultLocation} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <RecenterMap default={defaultLocation} />
        <MyLocation movedToMyLocation={props.movedToMyLocation} myLocationClicked={props.myLocationClicked}/>
        <LocationMarker/>
        <Marker position={props.selectedLocation || defaultLocation}>
          <Popup>selected location</Popup>
        </Marker>
        <Button onClick={() => {}}>
      <i className="fas fa-compass" style={{fontSize:20}}></i>
      </Button>
        <ShowPosts />
      </MapContainer>
    );
  }

  return <div>{renderMap()}</div>;
};

const mapStateToProps = ({selectedLocation}) => {
  return {
    selectedLocation
  };
};

export default connect(mapStateToProps)(FakelookMap);