const getUsersLocation = (callback, defaultLocation = null) => {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => callback({ lat: coords.latitude, lng: coords.longitude }),
    () => {
      if (defaultLocation) callback(defaultLocation);
      alert("Error! Could not determine your current location");
    },
    { enableHighAccuracy: true, timeout: 5000 }
  );
};

export default getUsersLocation;
