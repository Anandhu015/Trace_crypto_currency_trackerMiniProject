import React from 'react'
import { Line } from "react-chartjs-2";
const Linechart = ({prediction}) => {
  const data1 = {
    datasets: [
      {
        label: "5-day Prediction",
        data: prediction,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(255,223,0)"
      
      },
      
    ]
  };
  return<Line data={data1}></Line>

}

export default Linechart