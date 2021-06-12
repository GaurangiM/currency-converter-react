import { useEffect, useState } from 'react'
import axios from 'axios'

const CurrencyForm = (props) => {

  return (
    <div>
      <input type="number" className="currencyForm"/>
      <select>
        {props.currencies.map((currency, index)=> {
          return <option value={currency}
                          key={index}>
                    {currency}
                  </option>
        })}
      </select>
    </div>
  )
}

export default CurrencyForm