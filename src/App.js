import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import CurrencyForm  from './components/CurrencyForm/CurrencyForm';
import ChartOfRates from './components/Chart/ChartOfRates';

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
  
  const testDate =  moment().format('YYYY-MM-DD')
  
  const [newDate, setNewDate] = useState(testDate)

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
      const response = await axios.get("https://api.frankfurter.app/latest")
      const currencyListData = await axios.get("https://api.frankfurter.app/currencies")
      console.log(response, currencyListData)

      //Set default source and target currencies
      const firstCurrency = Object.keys(response.data.rates)[0]
      setCurrencies([response.data.base, ...Object.keys(response.data.rates)])
      setSourceCurrency(response.data.base)
      setTargetCurrency(firstCurrency)
      setExchangeRate(response.data.rates[firstCurrency])
      setCurrencyList({...currencyListData.data})
    }
    fetchData()
    
  }, [])

  //Get exchange rates for new source/target currency
  useEffect(()=> {
    const fetchChangedCurrency = async()=> {
      if(sourceCurrency) {
        const response = await axios.get(`https://api.frankfurter.app/${newDate}?from=${sourceCurrency}`)
        console.log(response)
        setExchangeRate(response.data.rates[targetCurrency])
      }
      
    }

    if(targetCurrency !== null) {
      fetchChangedCurrency()
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

  const fetchDataForInputDate = async()=> {
    
    if(newDate !== undefined) {
      const response = await axios.get(`https://api.frankfurter.app/${newDate}?from=${sourceCurrency}&to=${targetCurrency}`)
      console.log(Object.values(response.data.rates))
      setExchangeRate(Object.values(response.data.rates))
    }
    
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
                        onChangeHandler= {e=> setSourceCurrency(e.target.value)}/>
          <p className="equalsSign">=</p>
          <CurrencyForm currencies= {currencies}
                        defaultCurrency= {targetCurrency}
                        amount={targetAmount}
                        onAmountChange= {handleTargetAmountChange}
                        onChangeHandler= {e=> setTargetCurrency(e.target.value)}/>
          {addCurrencyRow && (
            <CurrencyForm currencies= {currencies}
            defaultCurrency= {targetCurrency}
            amount={targetAmount}
            onAmountChange= {handleTargetAmountChange}
            onChangeHandler= {e=> setTargetCurrency(e.target.value)}/>
          )}
          <button className="addButton shadow"
                  onClick={()=> setAddCurrencyRow(true)}>
            ADD
          </button>
          
          
          <p>Do you wish to choose different day to convert, go ahead and select your day !</p>
          
          <button type="submit" 
                  className="toggleCalender shadow"
                  onClick={()=> setDifferentDate(!isDifferentDate)}>
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
        
        
        
       
    </div>
  );
}

export default App;
