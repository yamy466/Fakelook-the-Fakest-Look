import { useState } from "react";
import { Button, Segment, Sidebar, SidebarPusher } from "semantic-ui-react";
import FakelookMap from "../mapComponents/map";
import UserMenu from "../userMenu/userMenu";

const MapFeed = () => {
  const [userControlVisible, setUserControlVisible] = useState(false);
  const [myLocationClicked, setMyLocationClicked] = useState(false)
 

  const onMyLocationClick = () => {
    setMyLocationClicked(true);
  }

  const movedToMyLocation = () => {
    setMyLocationClicked(false)
  }

  return (
    <>
      <Button onClick={() => setUserControlVisible(!userControlVisible)}>
        <i className="bars icon"  style={{fontSize:20}}></i>
      </Button>
      <Button onClick={onMyLocationClick}>
      <i className="fas fa-compass" style={{fontSize:20}}></i>
      </Button>
      <Sidebar.Pushable as={Segment}>
        <UserMenu visible={userControlVisible} setVisible={() => setUserControlVisible(!userControlVisible)} />
        <SidebarPusher>
          <FakelookMap myLocationClicked={myLocationClicked} movedToMyLocation={movedToMyLocation}/>
        </SidebarPusher>
      </Sidebar.Pushable>
    </>
  );
};


export default MapFeed;
