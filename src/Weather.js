import React, { useState, useEffect } from "react";
import "./Weather.css";
import Card from "./Card";

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let latlong = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        resolve(latlong);
      },
      (err) => reject(err)
    );
  });
}

function getDate(n) {
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = `${today.getDate() + n}/${
    month.length > 1 ? month : "0" + month
  }/${today.getFullYear()}`;
  return date;
}

export default function Weather() {
  const [forecast, setForecast] = useState();

  useEffect(() => {
    (async () => {
      let coords = await getLocation();
      let weather = await fetch(`/`, {
        method: "POST",
        body: JSON.stringify(coords),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await weather.json();
      setForecast(() => result);
    })();
  }, []);

  return (
    <div className="weather-block">
      {forecast ? (
        <div className="weather-card">
          <div className="weather-card__info">
            <div className="weather-card__title">
              <div className="weather-card__city">{forecast.title}:</div>
              <div className="weather-card__date">{getDate(0)}</div>
              <img
                className="weather-card__weather-state-abbr"
                src={`https://www.metaweather.com/static/img/weather/${forecast.consolidated_weather[0].weather_state_abbr}.svg`}
                alt="Weather state abbreviature"
              />
            </div>
            <div className="weather-card__today">
              <div className="weather-card__today-info">
                <ul className="daily-stats">
                  <li className="daily-stats__element">
                    {`Current weather: 
                    ${Math.round(forecast.consolidated_weather[0].the_temp)}°C`}
                  </li>
                  <li className="daily-stats__element">
                    {`Max temperature: 
                    ${Math.round(forecast.consolidated_weather[0].max_temp)}°C`}
                  </li>
                  <li className="daily-stats__element">
                    {`Min temperature: 
                    ${Math.round(forecast.consolidated_weather[0].min_temp)}°C`}
                  </li>
                  <li className="daily-stats__element">
                    {`Wind direction: 
                    ${forecast.consolidated_weather[0].wind_direction_compass}`}
                  </li>
                  <li className="daily-stats__element">
                    {`Wind speed: 
                    ${Math.round(forecast.consolidated_weather[0].wind_speed)}
                    m/sec`}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="weather-card__card-list">
            {forecast.consolidated_weather.slice(1).map((el, i) => (
              <li className="weather-card__card" key={el.id}>
                <Card props={el} date={getDate(i++)} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="main-block__loader"></div>
      )}
    </div>
  );
}
