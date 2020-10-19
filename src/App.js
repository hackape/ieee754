// @ts-check
import React, { useState, useMemo } from "react";
import { Float64ArrayView, calcExponent } from "./utils";

export default function App() {
  const setVersion = useState(0)[1];

  const float64view = useMemo(() => {
    const float64view = new Float64ArrayView(setVersion);
    return float64view;
  }, []);

  const calculateNumValue = useMemo(() => {
    function calculateNumValue(value) {
      try {
        var v = +eval(value);
        if (!Number.isNaN(v)) {
          float64view.setValue(v);
        }
      } catch (e) {}
    }

    return calculateNumValue;
  }, [float64view]);

  const binary64 = float64view.getBinary64();

  const { sign, exponent, significand } = binary64;

  return (
    <div className="App">
      <h1>IEEE-754 Float64 Converter</h1>
      <div className="InputContainer">
        Input:{" "}
        <input
          className="InputBox"
          onChange={(e) => calculateNumValue(e.target.value)}
        />
      </div>
      <div className="ViewContainer">
        <div>Decimal: {float64view.getValue()}</div>
        <div>
          Binary: {sign} {exponent} {significand}
        </div>
        <Binary64
          binary64={binary64}
          toggleBit={(pos) => float64view.toggleBit(pos)}
        />
      </div>
    </div>
  );
}

function Binary64({ binary64, toggleBit }) {
  const { exponent, sign, significand } = binary64;
  return (
    <div className="Binary64">
      <div className="Sign BitsFragment">
        <div>Sign</div>
        <Bits bits={sign} offset={0} toggleBit={toggleBit} />
      </div>
      <div className="Exponent BitsFragment">
        <div>Exponent</div>
        <Bits bits={exponent} offset={1} toggleBit={toggleBit} />
        <div>
          2<sup>{calcExponent(exponent)}</sup>
        </div>
      </div>
      <div className="Significand BitsFragment">
        <div>Significand</div>
        <Bits bits={significand} offset={12} toggleBit={toggleBit} />
      </div>
    </div>
  );
}

function Bits({ bits, offset, toggleBit }) {
  return (
    <div className="Bits">
      {bits.map((bit, i) => {
        const index = offset + i;
        return (
          <div
            key={index}
            className="Bit"
            onClick={() => {
              toggleBit(63 - index);
            }}
          >
            <sub>{63 - index}</sub>
            <div>{bit}</div>
          </div>
        );
      })}
    </div>
  );
}
