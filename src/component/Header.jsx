import React from "react";

export const Header = ({ dataByPoint }) => { 

    if (dataByPoint.length === 0 ) {
        return <p>Loading...</p>;
    }
    return ( 
        <div className="flex header">
            <div className="flex left flex-col">
            <img src={`https://openweathermap.org/img/wn/${dataByPoint?.weather[0].icon}@2x.png`} alt="weather icon" style={{width: '120px'}}/>
            <p>Temperature: {Math.round(dataByPoint?.main.temp)} <sup>o</sup>C</p>
            <b>Wind : { Math.round(dataByPoint.wind.speed / 1000 * 3600)} km/h </b>
            </div>
            <div className="flex right flex-col">
                <h4>Weather of {dataByPoint.date}</h4>
                <p> {dataByPoint.weather[0].description}</p>
                <p>Humidity : {dataByPoint.main.humidity} % </p>
            </div>
        </div>
    );
};
