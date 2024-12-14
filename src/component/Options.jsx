import React, { memo, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData, handleLatLong } from "../redux/weatherSlice";
import { useDebounce } from "../logic/helper";
import DropDown from "./UI/DropDown";
import { defaultForm } from "../default/form_default";
import "./style.css";

const MergedComponent = ({ username }) => {
  const dispatch = useDispatch();

  // State for favourite locations
  const [favouriteUserData, setFavouriteUserData] = useState([]);

  // State for form data
  const [form, setForm] = useState(defaultForm);

  // Get lat/lon from Redux state
  const lat = useSelector((state) => state.weather.lat);
  const lon = useSelector((state) => state.weather.lon);

  // Update form state with Redux values
  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      lat,
      lon,
    }));
  }, [lat, lon]);

  // Fetch favourite locations
  useEffect(() => {
    const fetchFavouriteLocations = async () => {
      try {
        const res = await fetch(
          "https://6540fa4445bedb25bfc2f9e6.mockapi.io/yami/bang1"
        );
        if (res.ok) {
          const data = await res.json();
          setFavouriteUserData(data);
        }
      } catch (error) {
        console.error("Failed to fetch favorite locations", error);
      }
    };

    fetchFavouriteLocations();
  }, []);

  // Handle form input changes
  const handleChangeFormData = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const debouncedHandleChange = useDebounce(handleChangeFormData, 300);

  // Handle form submission
  const handleSubmitForm = (event) => {
    event.preventDefault();

    const { units, lat, lon } = form;
    if (!lat && !lon) {
      dispatch(fetchWeatherData());
    } else if (parseFloat(lat) === +lat && parseFloat(lon) === +lon) {
      dispatch(handleLatLong({ lat, lon, units }));
      dispatch(fetchWeatherData({ lat, lon, units }));
    } else {
      console.error("Invalid latitude or longitude");
    }
  };

  // Handle dropdown item click
  const handleDropdownItemClick = (item) => {
    dispatch(handleLatLong({ lat: item.lat, lon: item.lon }));
    dispatch(fetchWeatherData({ lat: item.lat, lon: item.lon }));
  };

  return (
    <div className="merged-component">
      {/* Options Form Section */}
      <div className="options">
        <form className="form_options" onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="units">Choose Temperature Unit</label>
            <select
              name="units"
              value={form.units}
              onChange={handleChangeFormData}
            >
              <option value="imperial">F (Fahrenheit)</option>
              <option value="metric">C (Celsius)</option>
            </select>
          </div>
          <div>
            <label htmlFor="lat">Latitude</label>
            <input
              type="text"
              name="lat"
              value={form.lat}
              onChange={debouncedHandleChange}
            />
          </div>
          <div>
            <label htmlFor="lon">Longitude</label>
            <input
              type="text"
              name="lon"
              value={form.lon}
              onChange={debouncedHandleChange}
            />
          </div>
          <div className="form-control">
            <button type="submit">Confirm</button>
            <button type="button">Add </button>
            <button type="button">Delete</button>
          </div>
        </form>
      </div>
      {/* Favourite Locations Section */}
      {username && username !== "" ? (
        <div className="favourite-location">
          <h3>Your Favourite Location</h3>
          <DropDown
            data={favouriteUserData}
            onClickItem={handleDropdownItemClick}
            onClickEdit={() =>
              console.log("Edit functionality not implemented")
            }
          />
        </div>
      ) : null}
    </div>
  );
};

export default memo(MergedComponent);
