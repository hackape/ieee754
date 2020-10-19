export class Float64ArrayView {
  constructor(setVersion) {
    this.buffer = new ArrayBuffer(8);
    this.float = new Float64Array(this.buffer);
    this.uint8 = new Uint8Array(this.buffer);
    this.uint32 = new Uint32Array(this.buffer);
    this.update = () => {
      setVersion((v) => v + 1);
    };
  }

  toggleBit(pos) {
    const index = pos % 8;
    const uintIndex = (pos - index) / 8;
    this.uint8[uintIndex] ^= 1 << index;
    this.update();
  }

  getBinary64() {
    const uint = this.uint32;

    const bits = `${uint[1].toString(2).padStart(32, "0")}${uint[0]
      .toString(2)
      .padStart(32, "0")}`
      .split("")
      .map((v) => +v);

    const sign = bits.slice(0, 1);
    const exponent = bits.slice(1, 12);
    const significand = bits.slice(12);
    return {
      bits,
      sign,
      exponent,
      significand,
    };
  }

  setValue(val) {
    this.float[0] = val;
    this.update();
  }

  getValue() {
    return this.float[0];
  }
}

export function calcExponent(expBits) {
  const bias = 1023; // for 11-bit exp. formula: 2**(bits-1) - 1
  return parseInt(expBits.join(""), 2) - bias;
}
