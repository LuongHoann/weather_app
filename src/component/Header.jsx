import React from "react";
import { useSelector } from "react-redux";



export const Header = () => {
  let units = useSelector((state) => state.weather.units);
  let dataByPoint = useSelector((state)=> state.weather.dataByPoint)
  let name  = useSelector((state)=> state.weather.locate)

  if (dataByPoint.length === 0) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex header">
      <div className="flex left flex-col white">
        <img
          src={`https://openweathermap.org/img/wn/${dataByPoint?.weather[0].icon}@2x.png`}
          alt="weather icon"
          style={{ width: "120px" }}
        />
        <p>
          Temperature: {Math.round(dataByPoint?.main.temp)} <sup>o</sup>{" "}
          {units === "metric" ? "C" : "F"}{" "}
        </p>
        <b>Wind : {Math.round((dataByPoint.wind.speed / 1000) * 3600)} km/h </b>
      </div>
      <p className="self-start white" style={{fontSize: "2rem"}}>Forecast of  <b>{name}</b></p>
      <div className="flex right flex-col white">
        <h4>Weather of {dataByPoint.date}</h4>
        <p> {dataByPoint.weather[0].description}</p>
        <p>Humidity : {dataByPoint.main.humidity} % </p>
      </div>
    </div>
  );
};
