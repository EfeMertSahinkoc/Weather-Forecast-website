import { useState, useEffect } from "react";
import axios from "axios";
import WeatherCondition from "./components/wc";
import { Dimmer, Loader } from 'semantic-ui-react';
import './App.css';

const App = () => {

  const [weather, setWeather] = useState();
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

  }, [lat, long]);

  const getWeatherData = async (lat, lon) => {
    const key = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const data = await (await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`)).data;
      setWeather(data);
      console.log("data retreived")
    } catch {
      console.log("data couldnt retreived");
    }
  }

  useEffect(() => {
    lat && long && getWeatherData(lat, long);
  }, [lat, long]);



  return <div className="App">
    {(typeof weather != 'undefined') ? (
      <WeatherCondition weather={weather} />
    ) : (
      <div>
        <Dimmer active>
          <Loader>Loading..</Loader>
        </Dimmer>
      </div>
    )}
  </div>
};

export default App;