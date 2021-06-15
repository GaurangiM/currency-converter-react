import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Line } from "react-chartjs-2";


const ChartOfRates = ({ratesData, baseCurrency})=> {


  /*let finalData = {
    labels: [],
    datasets: [
      {
        label: "Exchange Rate",
        data: [],
        backgroundColor: "rgb(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        fill: false
      }

    ]
  };*/

  const opts = {
    tooltips: {
      intersect: false,
      mode: "index"
    },
    responsive: true,
    
  };

  /*const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [chartData, setChartData] = useState()



  let currency = "USD"
  useEffect(()=> {
    const fetchHistoricData = async()=> {
      const response = await axios.get(`https://api.frankfurter.app/2020-04-01..2021-05-01?to=USD`)
      console.log([...Object.values(response.data.rates).map(i=> i[`${currency}`])])
      setLabels([...Object.keys(response.data.rates)])
      setData([...Object.values(response.data.rates).map(i=> i[`${currency}`])])
      finalData.labels = labels
      finalData.datasets[0].data = data

      

      console.log(finalData)
      setChartData(finalData)
    }
    fetchHistoricData()
  }, [])*/
  
    
    

  

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