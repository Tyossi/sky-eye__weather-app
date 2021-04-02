import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({
  weather,
  temperature,
  city,
  country,
  maxTemp,
  minTemp,
  icon,
  date,
}) => {
  return weather !== undefined ? (
    <div className="weather-card-container">
      <div className="weather-card">
        <i className={`${icon}`}></i>
        <h2 className="weather-card-item city">
          {city}, {country}
        </h2>
        <p className="weather-card-item date">{date}</p>
        <div className="weather-card-item temperature">
          {temperature}&deg;C
          <div className="min-max__temp">
            <p className="min-__temp">{`min - temp ${minTemp}`}&deg;</p>
            <p className="max__temp"> {`max - temp ${maxTemp}`}&deg; </p>
          </div>
        </div>
        <br />

        <h2 className="weather-card-item weather">{weather}</h2>
      </div>
    </div>
  ) : (
    <div className="weather-card-container"></div>
  );
};

export default WeatherCard;
