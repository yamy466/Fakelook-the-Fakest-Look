import L from "leaflet";
import fakelookLogo from "../../logo/logo_transparent.png";

const customIcon = (
  iconUrl = fakelookLogo,
  iconWidth = 50,
  iconHeight = 50,
  className = ""
) => {
  return new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: null,
    iconAnchor: null,
    popupAnchor: [0, 0],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(iconWidth, iconHeight),
    className,
  });
};

export default customIcon;
