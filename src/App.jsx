import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "./component/List";
import { fetchWeatherData, setLoading } from "./redux/weatherSlice";
import Loading from "./component/Loading";
import { DashBoard } from "./component/DashBoard";
import "./App.css";

export default function App() {
  let isLoading = useSelector((state) => state.weather.isLoading);
  let lat = useSelector((state) => state.weather.lat);
  let lon = useSelector((state) => state.weather.lon);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchWeatherData(lat, lon));
    // Stop loading animation after 3 seconds
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 3000);
  }, []);
  // viet them middleware ?

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="dashboard">
            <img src="" alt="" />
            <p>Temperature: </p>
            <DashBoard/>
          </div>
          <List />
        </div>
      )}
    </>
  );
}
