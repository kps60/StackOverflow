// BarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, options, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
