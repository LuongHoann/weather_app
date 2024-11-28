import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { groupedData} from "../logic/logic";
import { getDayAndMonth, findMaxTemp, findMinTemp } from "../logic/logic";

const initialState = {
  data: [],
  subdata: [],
  diagramData: [],
  dataByPoint: [],
  locate:"",
  defaultIndex:0,
  lat: 21.028511,
  lon: 105.804817,
  isLoading: false,
  isError: false,
  units:"imperial"  // imperial :F  ; metric : C    
};
export const fetchWeatherData = createAsyncThunk("weather_data", async ({lat,lon,units}) => {
  console.log(lat,lon,units)
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=fb33e8951c8f73a0ca85687965d35b83&units=${units}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  console.log(data)
  return data;
});



export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    handleLatLong(state, action) {
      const { lat, lon , units } = action.payload;
      // console.log("payload",action.payload)
      if(lat && lon){
        state.lat = lat;
        state.lon = lon;
      }
      state.units = units
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setDefaultIndex: (state,action) => { 
        state.defaultIndex = action.payload;
    },
    // diagramData

    handleDiagram: (state, action) => {
      state.diagramData = [];
      state.diagramData = state.data[action.payload];
      state.dataByPoint = state.diagramData[0];
      state.defaultIndex = 0;
    },
    handleInfoByPoint: (state, action) => {
      state.dataByPoint = state.diagramData[action.payload];
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        // get locate 
        state.locate = action.payload.city.name 
        // add date property
        let data = action.payload.list.map((item) => {
          delete item.clouds;
          delete item.visibility;
          delete item.rain;
          delete item.dt_txt;

          return { ...item, date: getDayAndMonth(item) };
        });
        // merge each 8 items into 1 array
        // console.log(data);
        let mergedData = groupedData(data);
        // console.log(mergedData.length); // check length
        console.log("merged data ", mergedData);
        state.data = mergedData;

        // subdata
        state.subdata = [];
        mergedData.forEach((item) => {
          state.subdata.push({
            date: getDayAndMonth(item[0]),
            max_temp: findMaxTemp(item),
            min_temp: findMinTemp(item),
            weather: item[0].weather[0].main,
            icon: item[0].weather[0].icon,
          });
        });

        // diagramData
        state.diagramData = [];
        state.diagramData = mergedData[0];
        state.dataByPoint = state.diagramData[0];
       

        // update the default value of diagram 
        state.isLoading = false
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchWeatherData.pending, (state, action) => {
        state.isLoading = true;
      });

    // diagramData
  },
});
export const { handleLatLong, setLoading, handleDiagram, handleInfoByPoint , setDefaultIndex} =
  weatherSlice.actions;

export default weatherSlice.reducer;
