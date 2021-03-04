import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";

const MyLocation = ({myLocationClicked,movedToMyLocation}) => {
    const map = useMapEvents({
        locationfound({latlng}) {
            map.flyTo(latlng,15)
            movedToMyLocation()
          },
    })

    useEffect(() => {
        if(myLocationClicked){
            map.locate();
        }
    }, [map, myLocationClicked])
    return null;
}

export default MyLocation;