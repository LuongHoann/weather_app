import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "./component/List"
import { fetchWeatherData } from "./redux/weatherSlice"
import "./App.css" 

export default function App() {
  let isLoading = useSelector((state) => state.weather.isLoading);
  let lat = useSelector((state) => state.weather.lat);
  let lon = useSelector((state) => state.weather.lon);
  
  const dispatch = useDispatch();

  useEffect(()=>{dispatch(fetchWeatherData(lat, lon))}, []);
  // viet them middleware ?
  //
  return (
    <>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div className="container">
        <div className="dashboard">
          <img src="" alt="" />
          <p>Temperature: </p>
        </div>
        <List />
      </div>
    )}
  </>
  );
}
