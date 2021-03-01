import L from "leaflet";
import fakelookLogo from "../../logo/logo_transparent.png";

// class CustomIcon extends L.Icon {
//   constructor(
//     iconUrl = "../../logo/logo_transparent.png",
//     iconSize = [38, 95],
//     iconAnchor = [22, 94],
//     popupAnchor = [-3, -76]
//   ) {
//     super();
//     this.iconSize = iconSize;
//     this.iconUrl = iconUrl;
//     this.iconAnchor = iconAnchor;
//     this.popupAnchor = popupAnchor;
//   }
// }

const customIcon = (
  iconUrl = fakelookLogo,
  iconWidth = 70,
  iconHeight = 70,
  className = ""
) => {
  return new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: null,
    iconAnchor: [22, 94],
    popupAnchor: [13, -70],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(iconWidth, iconHeight),
    className: className,
  });
};

export default customIcon;
