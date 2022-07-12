export default interface ILocation {
  loaded: boolean;
  error: string;
  coords: {
    lat: number;
    lng: number;
  };
}