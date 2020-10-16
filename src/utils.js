export function doubleToIEEE(num) {
  const buf = new ArrayBuffer(8)
  const f = new Float64Array(buf)
  f[0] = num
  const uint = new Uint32Array(buf)
  return `${uint[1].toString(2).padStart(32, '0')}${uint[0].toString(2).padStart(32, '0')}`.split('').map(v => +v)
}

export function calcExponent(expBits) {
  const bias = 1023  // for 11-bit exp. formula: 2**(bits-1) - 1
  return parseInt(expBits.join(''), 2) - bias
}