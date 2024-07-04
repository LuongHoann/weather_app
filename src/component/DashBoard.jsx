import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useDispatch, useSelector } from "react-redux";
import { handleInfoByPoint, setDefaultIndex } from "../redux/weatherSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const backgroundPlugin = {
  id: "backgroundPlugin",
  beforeDraw: (chart) => {
    const {
      ctx,
      chartArea: { top, bottom, right, left },
    } = chart;
    ctx.fillStyle = "#000";
    ctx.fillRect(-30, top - 30, right + 60, bottom + 60);
  },
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 5.5,
  animation: {
    duration: 4000,
  },
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: true,
      text: "",
    },
    datalabels: {
      font: {
        size: 12,
        // weight: "bold",
      },
      align: "end",
      offset: 10,
      // labels: {
      //   title: {
      //     color: "grey",
      //   },
      // },
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      suggestedMin: 10,
      suggestedMax: 40,
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      // hitRadius:100,
    },
    line: {
      tension: 0.5,
    },
  },
  interaction: {
    mode: "nearest",
  },
};

export function DashBoard() {
  const chartRef = useRef(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // State to track data loading
  const [labels, setLabels] = useState([]);


  const weatherData = useSelector((state) => state.weather.data);
  const diagramData = useSelector((state) => state.weather.diagramData);
  let hitedIndex = useSelector((state) => state.weather.defaultIndex);

  //
  const dispatch = useDispatch();

  useEffect(() => {
    if (diagramData) {
      setLabels(
        diagramData.map(
          (item) => new Date(item.dt * 1000).toString().slice(16, 21)
        )
      );
      setIsDataLoaded(true); // Mark data as loaded once it's fetched
    }
  }, [weatherData,diagramData]);

  const handleGetData = async (event) => {
    const chart = chartRef.current;
    const points = chart.getElementsAtEventForMode(
      event,
      "nearest",
      { intersect: false },
      true
    );
    if (points.length) {
      const firstPoint = points[0];
      const index = firstPoint.index;
      const label = chart.data.labels[firstPoint.index];
      const value =
        chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
      await dispatch(setDefaultIndex(index));
      dispatch(handleInfoByPoint(index));
    }
  };

  // Render the chart only when data is loaded
  if (!isDataLoaded) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: diagramData.map((item) => Math.round(item.main.temp)),
        borderColor: "rgba(222, 150, 18, 1)",
        backgroundColor: "rgba(222, 150, 18, 0.5)",
        datalabels: {
          color: (context) => {
            return context.dataIndex === hitedIndex ? "white" : "grey";
          },
        },
      },
    ],
  };

  return (
    <Line
      options={options}
      data={data}
      plugins={[ChartDataLabels, backgroundPlugin]}
      ref={chartRef}
      onClick={handleGetData}
    />
  );
}
