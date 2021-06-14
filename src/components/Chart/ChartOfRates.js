import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';


const ChartOfRates = (props)=> {

  const [chartData, setChartData] = useState([])
  const [xValues, setXValues] = useState([])
  const [yValues, setYValues] = useState([])
  const { source, target } = props
  console.log(xValues.length, yValues.length)

  useEffect(()=> {
    const fetchHistoricalData = async()=> {
      if(source !== null && target !== null) {
        const response = await axios.get(`https://api.frankfurter.app/2019-01-04..?from=${source}&to=${target}`)
      console.log("Chart", response.data.rates)
      const xValuesData = [...Object.keys(response.data.rates)]
      let yValuesData = [...Object.values(response.data.rates)]
      //const yValuesData = [...Object.values(yValues)]
      console.log("x", xValuesData.length, yValuesData.length)
      //setChartData([response.data.rates])
      yValuesData = yValuesData.map(item=> Object.values(item))
      setXValues([...xValuesData])
      setYValues([...yValuesData])
      //const currencyKey = target.toString()
      //console.log(yValues.map(item=> Object.values(item)))
      }
      
    }
    fetchHistoricalData()
  }, [source, target])


  return (
    <div>
      <Plot data={[
          {
            x: [...xValues.map(i=> i)],
            y: [...yValues.map(i=> i)],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
        ]}
        layout={ {width: 720, height: 440, title: 'A Fancy Plot'} }/>
    </div>
  )
}

export default ChartOfRates