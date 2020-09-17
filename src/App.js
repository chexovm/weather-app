import React, { useState } from "react";
import Weather from "./Weather";
import "./App.css";

export default function App() {
  const [show, setShow] = useState(false);

  function showWeather() {
    setShow(() => !show);
  }

  return (
    <>
      <a href="/" className="title">
        Weather App
      </a>
      {show ? (
        <Weather />
      ) : (
        <button className="main-block__button" onClick={showWeather}>
          <span>Get your weather forecast!</span>
        </button>
      )}
    </>
  );
}
