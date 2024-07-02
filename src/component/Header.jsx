import React from "react";

export const Header = ({ dataByPoint }) => { 

    if (dataByPoint.length === 0 ) {
        return <p>Loading...</p>;
    }
    return ( 
        <div>
            <img src={`https://openweathermap.org/img/wn/${dataByPoint?.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>Temperature: {Math.round(dataByPoint?.main.temp)} <sup>o</sup>C</p>
            <p>{dataByPoint.weather[0].description}</p>
            <p>Humidity : {dataByPoint.main.humidity} % </p>
            <p>Wind : { Math.round(dataByPoint.wind.speed / 1000 * 3600)} km/h </p>
        </div>
    );
};
