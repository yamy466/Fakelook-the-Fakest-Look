const getUsersLocation = (callback, defaultLocation = [32.09754044645131, 34.826256097397454]) => {
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
