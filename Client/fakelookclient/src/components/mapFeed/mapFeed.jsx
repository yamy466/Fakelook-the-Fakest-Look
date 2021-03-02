import { useState } from "react";
import { Button, Segment, Sidebar, SidebarPusher } from "semantic-ui-react";
import FakelookMap from "../mapComponents/map";
import UserMenu from "../userMenu/userMenu";

const MapFeed = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(!visible)}>
        <i class="bars icon"></i>
      </Button>
      <Sidebar.Pushable as={Segment}>
        <UserMenu visible={visible} setVisible={() => setVisible(!visible)} />
        <SidebarPusher>
          <FakelookMap />
        </SidebarPusher>
      </Sidebar.Pushable>
    </>
  );
};

export default MapFeed;
