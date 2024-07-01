import { useDispatch, useSelector } from "react-redux"
import Item from "./Item"
import { handleDiagram } from "../redux/weatherSlice";

export default function List(props) {
    let dispatch = useDispatch();
    let data = useSelector((state) => state.weather.subdata)
    
    return (
        <div style={{display:'flex' ,  justifyContent: 'space-between'}}>
            {Object.keys(data).map((item,index) => (
                <Item key={index} data={data[item]} onClick = {()=>dispatch(handleDiagram(index))}/>
            ))}
        </div>
    )
}

// const List = () => {
//     const weatherData = useSelector((state) => state.weather.data);
  
//     if (!weatherData.length) {
//       return <p>No weather data available.</p>;
//     }
  
//     return (
//       <div>
//         {weatherData.map((dayData, index) => (
//           <div key={index} className="weather-day">
//             {dayData.map((weather, idx) => (
//               <div key={idx} className="weather-details">
//                 <p>Date: {weather.dt_txt}</p>
//                 <p>Temperature: {weather.main.temp} °C</p>
//                 <p>Min Temperature: {weather.main.temp_min} °C</p>
//                 <p>Max Temperature: {weather.main.temp_max} °C</p>
//                 <p>Weather: {weather.weather[0].description}</p>
//                 <p>Wind Speed: {weather.wind.speed} m/s</p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   };