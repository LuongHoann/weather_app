import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "./component/List";
import { fetchWeatherData, setLoading } from "./redux/weatherSlice";
import Loading from "./component/Loading";
import { DashBoard } from "./component/DashBoard";
import { Header } from "./component/Header";
import "./App.css";
import Options from "./component/Options";

export default function App() {
  const [loading , setLoading]= useState(true)

  let lat = import.meta.env.VITE_DEFAULT_LAT|| "21.028511"; // Default to Hanoi latitude
  let lon = import.meta.env.VITE_DEFAULT_LON|| "105.804817"; // Default to Hanoi longitude
  let units = import.meta.env.VITE_DEFAULT_UNITS || "metric"; // Default to metric
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherData({lat,lon,units}))
    // Stop loading animation after 3 seconds
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, []);
  // viet them middleware ?

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <Options/>
          <div className="dashboard">
            <Header/>
            <DashBoard/>
          </div>
          <List />
        </div>
      )}
    </>
  );
}
