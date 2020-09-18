import React from "react";
import "./Card.css";

export default function Card({ props, date }) {
  return (
    <div className="daily-card">
      <div className="img-containter">
        <img
          className="img-containter__weather-state"
          src={`https://www.metaweather.com/static/img/weather/${props.weather_state_abbr}.svg`}
          alt="Weather state abbreviature"
        />
        <div className="img-containter__date">{date}</div>
        <div className="img-containter__temp">
          {Math.round(props.the_temp)}°C
        </div>
        <div className="misc-temp">
          <div className="misc-temp__max-temp">
            Max: {Math.round(props.max_temp)}°C
          </div>
          <div className="misc-temp__min-temp">
            Min: {Math.round(props.min_temp)}°C
          </div>
        </div>
        <div className="wind-info">
          <div className="wind-info__dir">{props.wind_direction_compass}</div>
          <div className="wind-info__speed">
            {Math.round(props.wind_speed)}m/s
          </div>
        </div>
      </div>
    </div>
  );
}
