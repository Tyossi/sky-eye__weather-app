import React, { useState, useRef } from "react";
import SearchBar from "../SearchBar/SearchBar";
import WeatherCard from "../WeatherCard/WeatherCard";
import "../../App.css";

const Weather = () => {
  const [query, setQuery] = useState("");

  const [weather, setWeather] = useState({});

  const [icon, setIcon] = useState("");

  const [error, setError] = useState(false);

  const [notFound, setNotFound] = useState(false);

  const getSearchInput = useRef();

  const dateGenerator = (d) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const getIcon = (weatherId) => {
    switch (true) {
      case weatherId >= 200 && weatherId <= 232:
        setIcon("wu wu-white wu-128 wu-tstorm");
        break;
      case weatherId >= 300 && weatherId <= 321:
        setIcon("wu wu-white wu-128 wu-chancerain");
        break;
      case weatherId >= 500 && weatherId <= 531:
        setIcon("wu wu-white wu-128 wu-rain");
        break;
      case weatherId >= 600 && weatherId <= 622:
        setIcon("wu wu-white wu-128 wu-snow");
        break;
      case weatherId >= 701 && weatherId <= 781:
        setIcon("wu wu-white wu-128 wu-hazy");
        break;
      case weatherId === 800:
        setIcon("wu wu-white wu-128 wu-clear");
        break;
      case weatherId >= 801 && weatherId <= 804:
        setIcon("wu wu-white wu-128 wu-cloudy");
        break;

      default:
        return;
    }
  };

  const url = "https://api.openweathermap.org/data/2.5/";
  const apiKey = "4277a7fa39b9695f4d6d2526640ef8dd";

  const fetchData = (e) => {
    if (e.key === "Enter") {
      if (query) {
        fetch(`${url}weather?q=${query}&units=metric&APPID=${apiKey}`)
          .then((response) => response.json())
          .then((result) => {
            if (result.message === "city not found") {
              setNotFound(true);
              setTimeout(() => {
                setNotFound(false);
              }, 2000);
            } else {
              setWeather(result);
              getIcon(result.weather[0].id);
            }
          });

        setQuery("");
      } else {
        setError(true);

        setTimeout(() => {
          setError(false);
        }, 2000);
      }

      getSearchInput.current.value = "";
    }
  };

  const lazyLoading = weather < 0;

  return (
    <div>
      {lazyLoading ? (
        "loading"
      ) : (
        <div
          className={
            typeof weather.main != "undefined"
              ? weather.main.temp > 18
                ? "warm"
                : "cool"
              : "landing"
          }
        >
          <SearchBar
            query={query}
            fetchData={fetchData}
            setQuery={setQuery}
            getSearchInput={getSearchInput}
            notFound={notFound}
            error={error}
          />

          {typeof weather.main !== "undefined" ? (
            <WeatherCard
              weather={weather.weather[0].description}
              temperature={Math.floor(weather.main.temp)}
              maxTemp={Math.floor(weather.main.temp_max)}
              minTemp={Math.floor(weather.main.temp_min)}
              city={weather.name}
              country={weather.sys.country}
              icon={icon}
              date={dateGenerator(new Date())}
            />
          ) : (
            <WeatherCard />
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
