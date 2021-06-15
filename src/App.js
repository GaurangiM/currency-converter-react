import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import CurrencyForm  from './components/CurrencyForm/CurrencyForm';
import ChartOfRates from './components/Chart/ChartOfRates';
import { formatHistoricalData } from './utils/utils';
import { apiUrl } from './config/constants'

const App = ()=> {

  const [currencies, setCurrencies] = useState([]);
  const [currencyList, setCurrencyList] = useState()
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [isAmountFromSource, setIsAmountFromsource] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  const [isDifferentDate, setDifferentDate] = useState(false)
  const [addCurrencyRow, setAddCurrencyRow] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const [pastData, setPastData] = useState()

  const [currencyRowList, setCurrencyRowList] = useState([{
    currencies,
    targetCurrency,
    amount
  }])
  
  const today =  moment().format('YYYY-MM-DD')
  const oneMonthBack = moment().subtract(30, 'days').format('YYYY-MM-DD');
  const [newDate, setNewDate] = useState(today)

  let sourceAmount, targetAmount
  

  if(isAmountFromSource) {
    sourceAmount = amount;
    targetAmount = (amount * exchangeRate).toFixed(4);
  } else {
    targetAmount = amount;
    sourceAmount = (amount / exchangeRate).toFixed(4);
  }

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get(`${apiUrl}/latest`)
      const currencyListData = await axios.get(`${apiUrl}/currencies`)
     
      //Set default source and target currencies
      const firstCurrency = Object.keys(response.data.rates)[0]
      setCurrencies([response.data.base, ...Object.keys(response.data.rates)])
      setSourceCurrency(response.data.base)
      setTargetCurrency(firstCurrency)
      setExchangeRate(response.data.rates[firstCurrency])
      setCurrencyList({...currencyListData.data})
      setCurrencyRowList([
        {
        currencies:[response.data.base, ...Object.keys(response.data.rates)],
        targetCurrency: firstCurrency
      }])
    }
    fetchData()
    
  }, [])

  //Get exchange rates for new source/target currency
  useEffect(()=> {
    const fetchChangedCurrency = async()=> {
      if(sourceCurrency) {
        const response = await axios.get(`${apiUrl}/${newDate}?from=${sourceCurrency}`)
        setExchangeRate(response.data.rates[targetCurrency])
      }
      
    }

    if(targetCurrency !== null) {
      fetchChangedCurrency()
    }

    if(sourceCurrency && targetCurrency) {
      fetchHistoricData()
    }
    

  }, [sourceCurrency, targetCurrency, newDate, addCurrencyRow])

  const handleSourceAmountChange = (e)=> {
    setAmount(e.target.value)
    setIsAmountFromsource(true)
  }  

  const handleTargetAmountChange = (e)=> {
    setAmount(e.target.value)
    setIsAmountFromsource(false)
  }

  const fetchHistoricData = async() => {
    const response = await axios.get(`${apiUrl}/${oneMonthBack}..${today}?from=${sourceCurrency}&to=${targetCurrency}`)
    console.log("History", response)
    let finalData = formatHistoricalData(response.data.rates, targetCurrency, sourceCurrency)
    setPastData(finalData)
    console.log(pastData)
  }
 
  return (
    
    <div className="App">
        <h1>Currency Converter</h1>
        <div className="exchangeForm shadow">
          <h2>1 {sourceCurrency} equals to {exchangeRate} {targetCurrency}</h2>
          <CurrencyForm currencies= {currencies}
                        defaultCurrency= {sourceCurrency}
                        amount= {sourceAmount}
                        onAmountChange= {handleSourceAmountChange}
                        onChangeHandler= {(e)=> setSourceCurrency(e.target.value)}/>
          <span style={{fontSize: 30}}>=</span>
          <CurrencyForm currencies= {currencies}
                            defaultCurrency= {targetCurrency}
                            amount={targetAmount}
                            onAmountChange= {handleTargetAmountChange}
                            onChangeHandler= {(event)=> {
                              setTargetCurrency(event.target.value)
                            }}/>
          {addCurrencyRow && (
            <CurrencyForm currencies= {currencies}
            defaultCurrency= {targetCurrency}
            amount={targetAmount}
            onAmountChange= {handleTargetAmountChange}
            onChangeHandler= {e=> setTargetCurrency(e.target.value)}/>
          )}
          
          <p>Do you wish to choose different day to convert, go ahead and select your day !</p>
          
          <button type="submit" 
                  className="toggleCalender shadow"
                  onClick={()=> {
                    setDifferentDate(!isDifferentDate)
                    setNewDate(today)
                    }}>
                    {isDifferentDate? "Hide Calender" : "Show Calender"}
          </button>
          {isDifferentDate && (
              <DatePicker selected={moment(newDate).toDate()} 
              onChange={(date) => setNewDate(moment(date).format('YYYY-MM-DD'))}
              dateFormat="yyyy-mm-dd"
              maxDate={moment().toDate()}
              inline />
          )}
        </div>
        <ChartOfRates ratesData={pastData}
                      baseCurrency={sourceCurrency}/>
        
        
        
        
       
    </div>
  );
}

export default App;
