import Keys from './keys';
import './App.css';
import {useState, useEffect} from 'react';
import Axios from 'axios';
import CardWeather from './components/weather/CardWeather';
import WeatherInfo from './components/weather/WeatherInfo';
import CardAddress from './components/address/CardAddress';
import Spinner from './components/spinner/Spinner';

interface WeatherClass {
  main: {
      humidity: number,
      feels_like: number,
      temp: number,
      temp_max: number,
      temp_min: number,
      pressure: number
    },
    wind: {
      speed: number
    },
    sys: {
      sunrise: number, 
      sunset: number
    },
    dt: number,
}

const App = () => {

  const [address, setAddress] = useState<string>();
  const [weather, setWeather] = useState<WeatherClass>();

  const [loading, setLoading] = useState<boolean>(false);

  const [location, setLocation] = useState({
    loaded: false,
    error: '',
    coords: {
        lat: 0,
        lng: 0
    }
  });

  const onSuccess = (response: GeolocationPosition) => {
    setLocation({
        loaded: true,
        error: '',
        coords: {
            lat: response.coords.latitude,
            lng: response.coords.longitude
        }
    });
    setTimeout(() => {
    }, 500);
  }

  const onError = (error: GeolocationPositionError) => {
    setLocation({
        loaded: true,
        error: error.message,
        coords: {
            lat: 0,
            lng: 0
        }
    });
  }
  
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  useEffect(() => {
    getLocation()
  }, []);


  const getInformations = () => {
    setLoading(true);

    if(location.loaded) {
      Axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.coords.lat + ',' + location.coords.lng + '&key=' + Keys.google
      ).then(response => {

        setAddress(response.data.results[0].formatted_address);
      })
      Axios.get(
        'https://api.openweathermap.org/data/2.5/weather?lat=' + location.coords.lat + '&lon=' + location.coords.lng + '&appid=' + Keys.openWeather + '&lang=pt_br&units=metric'
      ).then(response => {

        setWeather((response.data));

        setLoading(false);
      });
    }
  }

  useEffect(() => {  
    getInformations();
  }, [location]);


  const refreshLocation = () => {
    getLocation();
  }
  return (
    <div className="App">
      <h1>Updated local weather</h1>

      <button onClick={refreshLocation}>
        Refresh
      </button>

      <CardAddress title='Address' address={ address ? address : '' } />

      <div className='Cards'>

        
        <CardWeather title='Local date time' >
          <WeatherInfo title='Date' data={ weather ? new Date(weather.dt*1000).toLocaleDateString() : new Date().toLocaleDateString() } />
          <WeatherInfo title='Time' data={ weather ? new Date(weather.dt*1000).toLocaleTimeString() : new Date().toLocaleTimeString() } />
          <WeatherInfo title='Sunrise' data={ weather ? new Date(weather.sys.sunrise*1000).toLocaleTimeString() : new Date().toLocaleTimeString() } />
          <WeatherInfo title='Sunset' data={ weather ? new Date(weather.sys.sunset*1000).toLocaleTimeString() : new Date().toLocaleTimeString() } />
        </CardWeather>
        
        <CardWeather title='Temperature' >
          <WeatherInfo title='Temperature' data={ weather ? weather.main.temp.toFixed(0) : '' } metric=' °C' />
          <WeatherInfo title='Minimum' data={ weather ? weather.main.temp_min.toFixed(0) : '' } metric=' °C' />
          <WeatherInfo title='Maximum' data={ weather ? weather.main.temp_max.toFixed(0) : '' } metric=' °C' />
          <WeatherInfo title='Thermal sensation' data={ weather ? weather.main.feels_like.toFixed(0) : '' } metric=' °C' />
        </CardWeather>

        <CardWeather title='Atmosphere' >
          <WeatherInfo title='Humidity' data={ weather ? weather.main.humidity.toString() : '0' } metric='%'/>
          <WeatherInfo title='Pressure' data={ weather ? weather.main.pressure.toString() : '0' } metric=' hPa'/>
          <WeatherInfo title='Wind' data={ weather ? (weather.wind.speed * 3.6).toFixed(0) : '0' } metric=' km/h'/>
        </CardWeather>


        <Spinner loading = {loading} />
      </div>
    </div>
  );
}

export default App;