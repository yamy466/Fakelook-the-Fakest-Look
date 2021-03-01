import { MenuItem } from "semantic-ui-react";
import env from "../../enviroments/enviroment"

const UserMenuItem = ({ header, title, active, setActive,icon }) => {
  return (
    <MenuItem
      header={header}
      style={{ backgroundColor: active === title ? "" : env.mainColor }}
      active={active === title}
      onClick={() => {
        setActive(title);
      }}
    >
        {console.log(icon)}
      <i className={`fas fa-${icon}`} style={{fontSize: 30}}></i>
    </MenuItem>
  );
};

export default UserMenuItem;
