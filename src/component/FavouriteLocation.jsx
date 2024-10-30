import React, { memo, useEffect, useState } from "react";

const FavouriteLocation = () => {
  const [favouriteUserData, setFavouriteUserData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      let res = await fetch(
        "https://65bba99152189914b5bccfcc.mockapi.io/applicant"
      );
      if (res.ok) {
        let data = await res.json();
        setFavouriteUserData(data);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          {favouriteUserData.length > 0 &&
            Object.keys(favouriteUserData[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {favouriteUserData.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(FavouriteLocation);
