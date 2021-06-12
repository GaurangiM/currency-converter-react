import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'

import CurrencyForm  from './components/CurrencyForm/CurrencyForm';

function App() {

  const [currencies, setCurrencies] = useState([]);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get("http://api.exchangeratesapi.io/v1/latest?access_key=74c176c283bb113a4580c2e12ed7d975")
      console.log(response)
      setCurrencies([response.data.base, ...Object.keys(response.data.rates)])
    }

    fetchData()
  }, [])

  return (
    <div className="App">
        <h1>Currency Converter</h1>
        <CurrencyForm currencies= {currencies}/>
        <p className="equalsSign">=</p>
        <CurrencyForm currencies= {currencies}/>
    </div>
  );
}

export default App;
