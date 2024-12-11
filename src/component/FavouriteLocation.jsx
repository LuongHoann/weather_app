import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherData, handleLatLong } from "../redux/weatherSlice";

const FavouriteLocation = () => {
  const dispatch = useDispatch()
  const [favouriteUserData, setFavouriteUserData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      let res = await fetch(
        "https://6540fa4445bedb25bfc2f9e6.mockapi.io/yami/bang1"
      );
      if (res.ok) {
        let data = await res.json();
        setFavouriteUserData(data);
      }
    };

    fetchWeatherData();
  }, []);

  console.log(favouriteUserData)
  return (
    <div className="favourite-location">
      <h3>Your favourite Location</h3>
      <select className="favourite-location_select" onChange={(e)=> { 
        const selectedIndex = e.target.selectedIndex
        if(selectedIndex !== 0 ){ 
            const selectedItem = favouriteUserData[selectedIndex-1]
            dispatch(fetchWeatherData({lat: selectedItem.lat , lon: selectedItem.long}))
            dispatch(handleLatLong({lat: selectedItem.lat , lon: selectedItem.long}))
        }
      }}>
        {
          favouriteUserData && favouriteUserData.length > 0 ?
           favouriteUserData.map(
            (item) => (
            <option key={item.id} className="favourite-location_option">{item.cityname} {item.lat} | {item.long}</option>
          )) : "there is no favourite location !"
        }
      </select>
    </div>
  );
};

export default memo(FavouriteLocation);
