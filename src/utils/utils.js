export const formatHistoricalData = (ratesData, targetCurrency, sourceCurrency) => {
  let finalData = {
    labels: [],
    datasets: [
      {
        label: `Exchange Rate of ${sourceCurrency} to ${targetCurrency} for last 30 days `,
        data: [],
        backgroundColor: "rgb(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        fill: false
      }
    ]
  };
  let labels = ([...Object.keys(ratesData)])
  let data = ([...Object.values(ratesData).map(i=> i[`${targetCurrency}`])])
  
  finalData.labels = labels
  finalData.datasets[0].data = data
  console.log(finalData)

    return finalData
}