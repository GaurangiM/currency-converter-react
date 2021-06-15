import React from 'react';
import { Line } from "react-chartjs-2";


const ChartOfRates = ({ratesData, baseCurrency})=> {
const opts = {
    tooltips: {
      intersect: false,
      mode: "index"
    },
    responsive: true,
};

return (
    <div className="dashBoard">
      Chart
      <div className="chart-container">
        {ratesData && (
          <Line data={ratesData} options={opts} />
        )}
        
      </div>
    </div>
  )
}

export default ChartOfRates