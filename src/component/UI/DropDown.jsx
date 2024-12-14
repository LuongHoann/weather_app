import React, { useEffect, useState } from "react";
import "./dropdown.css";


export default function DropDown(props) {
    const {onClickItem} = props
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
  }, [props]);

  return (
    <div className="dropdown-container">
      <ul>
        <div className="dropdown-list">
          {data.length ? (
            data.map((item) => {
              return (
                <li key={item.id} className="dropdown-item" onClick={()=>onClickItem({lat: item.lat,lon:item.long})}>
                  <div className="dropdown-information">
                  <p>{item.cityname}</p>
                  <small>{item.lat} | {item.long}</small>
                  </div>
                  <ins>Edit</ins>
                </li>
              );
            })
          ) : (
            <p> Thier is no favourite location stored</p>
          )}
        </div>
      </ul>
    </div>
  );
}
