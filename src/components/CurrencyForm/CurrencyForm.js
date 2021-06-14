import { useEffect, useState } from 'react'
import axios from 'axios'

import './Currencyform.css'

const CurrencyForm = (props) => {

  const currencyFlag = "currency-flag-" + props.defaultCurrency.toLowerCase()
  console.log(currencyFlag)

  return (
    <div className="currencyRow ">
      <input type="number" 
              className="currencyForm shadow" 
              value={props.amount}
              onChange={props.onAmountChange}/>
      <select value={props.defaultCurrency}
              onChange={props.onChangeHandler}>
        {props.currencies.map((currency, index)=> {
          return <option value={currency}
                          key={index}>{currency}
                  </option>
        })}
      </select>

      <span class={`currency-flag-xl currency-flag ${currencyFlag} flag`}></span>
    </div>
  )
}

export default CurrencyForm