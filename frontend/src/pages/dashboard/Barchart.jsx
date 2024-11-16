import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function BarChart() {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: true, // Display x-axis
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        ticks: {
          display: true, // Display y-axis labels
        },
        grid: {
          display: true, // Display y-axis grid lines
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Bar Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const datasets = [
    {
      label: 'Dataset 1',
      data: [10, 50, 40, 20, 80, 90, 35],
      backgroundColor: '#5e72e4',
      borderRadius: 10,
    },
  ];

  const data = {
    labels,
    datasets,
  };

  const containerStyle = {
    background: '#18214d',
    height: '100px', // Set the height to 100px
    margin: '10px 20px',
    borderRadius: '25px',
  };

  return (
    <>
      <div className="flex justify-center items-center w-full p-2 pb-2" style={containerStyle}>
        <Bar options={options} data={data} />
      </div>
    </>
  );
}
