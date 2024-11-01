import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { defaultForm } from '../default/form_default';
import './style.css';
import { useDebounce } from '../logic/helper';
import { useDispatch } from 'react-redux';
import { fetchWeatherData, handleLatLong } from '../redux/weatherSlice';
import { memo } from 'react';

const Options = memo(() => {
    const dispatch = useDispatch()
    let defalutLat = 21.028511;
    let defalutLong = 105.804817;
    // let defa
  const [form, setForm] = useState(defaultForm);

  const handleChangeFormData = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prevForm => {
     return { ...prevForm, [name]: value }
    });
    
  }, []);

  const debouncedHandleChange = useDebounce(handleChangeFormData, 300);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const { units, lat, lon } = form;
    console.log("data",form)
    if(lat == "" && lon == ""){
        dispatch(handleLatLong({defalutLat,defalutLong,units}))
        dispatch(fetchWeatherData({lat:defalutLat,lon:defalutLong,units}))
    } else  if (parseFloat(lat) === +lat && parseFloat(lon) === +lon) {
        dispatch(handleLatLong({lat,lon,units}))
        dispatch(fetchWeatherData({lat,lon,units}))
    } else {
      console.error('Invalid latitude or longitude');
    }
  };

  return (
    <div className="options">
      <form className="form_options" onSubmit={handleSubmitForm}>
        <div className="">
          <label htmlFor="units">Choose Temperature Unit</label>
          <select name="units"  value={form.units} onChange={handleChangeFormData}>
            <option value="imperial">F (Fahrenheit)</option>
            <option value="metric">C (Celsius)</option>
          </select>
        </div>
        <div className="">
          <label htmlFor="lat">Latitude</label>
          <input
            type="text"
            name="lat"
            onChange={debouncedHandleChange}
          />
        </div>
        <div className="">
          <label htmlFor="lon">Longitude</label>
          <input
            type="text"
            name="lon"
            onChange={debouncedHandleChange}
          />
        </div>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
});

export default Options;
