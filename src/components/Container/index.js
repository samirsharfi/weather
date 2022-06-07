import axios from "axios";
import { useEffect, useState } from "react";
import DropDown from "../DropDown";
import location from '../../assets/location.png'
import moment from "moment";

const Container = (props) => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      const ApiEndPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=5bc2b4f40acfffa046713955a4370d52`;

      axios.get(ApiEndPoint)
        .then((response) => {
          console.log("res", response.data);
          setData(response.data);
          props.spinner(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }, []);

  let weatherApi = (data) => {
    const choosenCity = data ? data : city ;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${choosenCity}
    &units=metric&appid=5bc2b4f40acfffa046713955a4370d52`;

    axios.get(url)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setCity("");

  };

  let searchCity = (e) => {
    if (e.key === "Enter") {
      weatherApi();
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
    
  };

  const handleClick = () => {
    setData({});
    setCity("");
  };

  const matchCity = (data) => {
    console.log(data);
    if (data) {
      setCity(data);
      console.log(data);
      weatherApi(data);
    }
  };


  return (
    <div className="container">
      <div className="search">
        <input
          value={city}
          onChange={(e) => handleChange(e)}
          onKeyPress={searchCity}
          placeholder="Enter location"
          type="text"
        />
        {city && <DropDown listCity={matchCity} city={city} />}
        <div className="btn">
          {data.name && <button onClick={() => handleClick()}>Clear</button>}
        </div>
      </div>
      <div className="top">
        <div className="location">
          {data.sys ? <> <img  src={location} alt="location"></img> <p>{data.sys.country}</p> </> : null}
          <div className="city">
            <p>{data.name}</p>
          </div>
          {data.name && <div className="date">
            {moment().format("LT")} -
            {moment().format("dddd")} ,
            {moment().format("MMM Do YY")}
          </div>}
        </div>
        <div className="top-right">
          <div className="temp">
          {data.main ? <><h1>{data.main.temp.toFixed()}</h1><p>°C</p></> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
      </div>
      {data.name && (
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p>{data.main.feels_like.toFixed()}°<span>C</span></p>
            ) : null}
            <p className="bold">Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p>{data.main.humidity}%</p> : null}
            <p className="bold">Humidity</p>
          </div>
          <div className="wind">
            {data.wind ?
              <p>{data.wind.speed.toFixed()} MPH</p>
              : null}
            <p className="bold">Wind Speed</p>
          </div>
          <div className="pressure">
            {data.main ? <p>{data.main.pressure} Pa</p> : null}
            <p className="bold">pressure</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Container;
