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
import { useSelector } from "react-redux";

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
  aspectRatio : 5.5,
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
      labels: {
        title: {
          color: "grey",
        },
      },
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
      ticks : { 
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
  const weatherData = useSelector((state) => state.weather.data);

  const diagramData = useSelector((state) => state.weather.diagramData);
  console.log(diagramData);
  const [labels, setLabels] = useState([]);


  useEffect(() => {
    if (weatherData && weatherData[0]) {
      // console.log(weatherData[0]);
      setLabels(
        weatherData[0].map((item) =>
          new Date(item.dt * 1000).toString().slice(16, 21)
        )
      );
    }
   
  }, [weatherData]);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        data: diagramData.map((item)=> Math.round(item.main.temp)), // Replace with your data
    
        borderColor: "rgba(222, 150, 18, 1)",
        backgroundColor: "rgba(222, 150, 18, 0.5)",
      },
    ],
  };

  const handleGetData = (event) => {
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
      console.log({ index,label, value });
    }
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
