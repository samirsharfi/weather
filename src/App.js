import axios from "axios";
import React, { useEffect, useState } from "react";


function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}
  &units=metric&appid=5bc2b4f40acfffa046713955a4370d52`



  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      const Api_endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=5bc2b4f40acfffa046713955a4370d52`

      axios.get(Api_endpoint)
        .then((response) => {
          console.log('res', response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    });


  }, []);


  let searchcity = (e) => {
    if (e.key === 'Enter') {
      axios.get(url)
        .then(function (response) {
          console.log(response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
      setCity('');
    }
  };
  const handleClick = () => {
    setData({});
    setCity('');
  }


  return (
    <div className="app">
      <div className="search">
        <h2>Weather Now</h2>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={searchcity}
          placeholder='Enter location'
          type="text" />
      </div>
      {data.name && <button onClick={() => handleClick()}>Clear</button>}
      <div className="container">
        <div className="top">
          <div className="city">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
        </div>
        <div className="description">
          {data.weather ? <p className='bold'>{data.weather[0].main}</p> : null}
        </div>
        {data.name &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
