import { useSelector } from "react-redux";

export default function Item(props) {
  let dataByPoint = useSelector((state) => state.weather.dataByPoint);
  let units = useSelector((state) => state.weather.units);
  console.log(units)
  // console.log("this is props" , props )
  return (
    <div
      className={`item ${
        dataByPoint.date === props.data.date ? "bg-items" : ""
      }`}
      style={{ flexGrow: 1 }}
      onClick={props.onClick}
    >
      <p className={`day`}>{props.data.date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${props.data.icon}@2x.png`}
      />
      <p className="tempature">
        {Math.floor(props.data.min_temp)}
        <sup>o</sup>
        {units === "metric" ? "C" : "F"} - {Math.ceil(props.data.max_temp)}
        <sup>o</sup>
        {units === "metric" ? "C" : "F"}{" "}
      </p>
      <p>{props.data.weather}</p>
    </div>
  );
}
