

export default function Item(props){ 
    // console.log("this is props" , props )
    return (
        <div className="item" style={{flexGrow:1}} onClick={props.onClick} >
            <p className="day">{props.data.date}</p>
            <img src={`https://openweathermap.org/img/wn/${props.data.icon}@2x.png`} />
            <p className="tempature">{ Math.floor(props.data.min_temp)}<sup>o</sup>C - {Math.ceil(props.data.max_temp)}<sup>o</sup>C</p>
            <p>{props.data.weather}</p>
        </div>
    )
}