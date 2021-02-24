import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Post from "../../models/post";
import customIcon from "./CustomIcon";
import "./map.css";

class FakelookMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 32.162580580196845,
      longitude: 34.806576938890494,
    };
  }

  getAllPosts = () => {
    const posts = [
      new Post(1,1,2,32.177658,34.822759,"first post",[1,2],{},["new"],[]),
      new Post(1,1,2,32.157658,34.822759,"second post",[3,4],{},["friday"],[]),
      new Post(1,1,2,32.127658,34.822759,"third post",[5,6],{},["resturant"],[]),
    ];
    return posts;
  };

  

  createLocation = ({latitude,longitude}) => {
    return { lat: latitude, lon: longitude };
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.success,
      this.error,
      this.options
    );
  }

  success = (position) => {
    let crds = position.coords;
    this.setState({
      latitude: crds.latitude,
      longitude: crds.longitude,
    });
    console.log("ok did it", crds.longitude, "long");
  };

  error = () => {
    this.setState({
      latitude: 32.09754044645131,
      longitude: 34.826256097397454,
    });
    console.log("failed");
  };

  options = () => {
    let options;
    return (options = {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  };


  renderLocations = () => {
    let posts = this.getAllPosts();
    return posts.map((post, index) => {
      return (
        <Marker icon={customIcon()} position={this.createLocation(post)}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      );
    });
  };

  renderMap = () => {
    const { latitude, longitude } = this.state;
    return (
      <MapContainer className="map" center={[latitude, longitude]}  zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.renderLocations()}
      </MapContainer>
    );
  };

  render() {
    return <div>{this.renderMap()}</div>;
  }
}

export default FakelookMap;
//32.09754044645131 34.826256097397454
