import React, { useState } from 'react'
import { doubleToIEEE, calcExponent } from './utils'

export default function App() {
  const [num, setNum] = useState(0)
  
  function calculateNumValue(value) {
    try {
      var v = eval(value)
      if (typeof v === 'number') setNum(v)
    } catch (e) {}
  }
  
  return (
    <div>
      <div>input: <input onChange={e => calculateNumValue(e.target.value)} /></div>
      <div>number: {num}</div>
      <Bits bits={doubleToIEEE(num)} />
    </div>
  )
}

function Bits({ bits }) {
  const sign = bits.slice(0, 1)
  const exponent = bits.slice(1, 12)
  const mantissa = bits.slice(12)
  return (
    <div className='Bits'>
      <div className='Sign'>
        <div>sign</div>
        <div><BitRow bits={sign} /></div>
      </div>
      <div className='Exponent'>
        <div>exp</div>
        <div><BitRow bits={exponent} /></div>
        <div>2<sup>{calcExponent(exponent)}</sup></div>
      </div>
      <div className='Mantissa'>
        <div>mantissa</div>
        <div><BitRow bits={mantissa} /></div>

      </div>
    </div>
  )
}

function BitRow({ bits }) {
  return bits.map((d, i) => <div key={i} className='bit'>{d}</div>)
}