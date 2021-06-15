export const formatHistoricalData = (ratesData) => {
  let finalData = {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        backgroundColor: "rgb(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        fill: false
      }
    ]
  };
  let labels = ([...Object.keys(ratesData)])
  let data = ([...Object.values(ratesData).map(i=> i["USD"])])
  
  finalData.labels = labels
  finalData.datasets[0].data = data
  console.log(finalData)

    return finalData
}