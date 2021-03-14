import { useState } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import Filter from "../filter/filter";
import Friends from "../friends/friends";
import Publish from "../publish/Publish";
import UserMenuItem from "../userMenuItem/userMenuItem";

const UserMenu = ({ visible, setVisible, showClose }) => {
  const [FILTER, PUBLISH, FRIENDS] = ["Filter", "Publish", "Friends"];

  //font-awesome icons
  const items = [
    { title: FILTER, icon: "filter" },
    { title: PUBLISH, icon: "image" },
    { title: FRIENDS, icon: "user-friends" },
  ];

  const mapItems = () => {
    return items.map(({ title, icon }) => {
      return (
        <UserMenuItem
          icon={icon}
          title={title}
          key={title}
          active={active}
          header={true}
          setActive={setActive}
        />
      );
    });
  };

  const [active, setActive] = useState("Filter");
  return (
    <Sidebar
      as={Segment}
      style={{ opacity: 0.9 }}
      animation="overlay"
      visible={visible}
      width="very wide">
      <Menu tabular>
        {mapItems()}
        {showClose && (
          <Menu.Menu position="right">
            <i
              class="fas fa-times"
              onClick={() => {
                setVisible(false);
              }}
              style={{ fontSize: 20, cursor: "pointer" }}></i>
          </Menu.Menu>
        )}
      </Menu>

      {(() => {
        switch (active) {
          case FILTER:
            return <Filter />;
          case PUBLISH:
            return <Publish />;
          case FRIENDS:
            return <Friends />;
          default:
            break;
        }
      })()}
    </Sidebar>
  );
};

export default UserMenu;
