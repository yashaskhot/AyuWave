import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {

  const [chartOptions, setChartOptions] = useState({
    name: "Doughnut Chart",
    position: "top",
  });
  const [options, setOptions] = useState({
    maintainAspectRatio: false,
    responsive: true,
    labels: false,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      legend: {
        position: chartOptions.position,
        display: false,
      },
      title: {
        display: false,
        text: chartOptions.name,
      },
    },
  }
  );

  const labels = ["Red", "Yellow", "Green", "Purple"];
  const datasets = [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132)",
       
        "rgba(255, 206, 86)",
        "rgba(75, 192, 192)",
        "rgba(153, 102, 255)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ];

  const data = {
    labels,
    datasets,
  };

  const containerStyle = {
    width: "300px", // Set the width to 100px
    height:"300px", // Set the height to 100px
    margin: "80px 20px",
    borderRadius: "25px",
   

  };

  return (
    <div className="flex justify-center items-center" style={containerStyle}>
      <Doughnut options={options} data={data} />
    </div>
  );
}
