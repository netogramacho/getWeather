import ILocation from "../interfaces/location";

export const getLocation = () => {
  let location: ILocation = {
    loaded: false,
    error: "",
    coords: {
      lat: 0,
      lng: 0,
    },
  };

  navigator.geolocation.getCurrentPosition(
    (response: GeolocationPosition) => {
        console.log(response);
      location = {
        loaded: true,
        error: "",
        coords: {
          lat: response.coords.latitude,
          lng: response.coords.longitude,
        },
      };
    },
    (error: GeolocationPositionError) => {
      location = {
        loaded: true,
        error: error.message,
        coords: {
          lat: 0,
          lng: 0,
        },
      };
    }
  );
  return location;
};
