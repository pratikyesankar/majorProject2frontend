import React from "react"
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Pie, Bar } from "react-chartjs-2"

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
)

function ChartComponent({ type, data, options }) {
  return type === "pie" ? (
    <Pie data={data} options={options} />
  ) : (
    <Bar data={data} options={options} />
  )
}

export default ChartComponent
