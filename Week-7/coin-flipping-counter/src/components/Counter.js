import React, { useState } from "react";
import Coin from "./Coin";

const Counter = () => {
  const [flips, setFlips] = useState({ heads: 0, tails: 0 });
  const [currentSide, setCurrentSide] = useState("");

  const flipCoin = () => {
    const side = Math.random() > 0.5 ? "Head" : "Tail";
    setCurrentSide(side);
    setFlips((prev) => ({
      ...prev,
      heads: prev.heads + (side === "Head" ? 1 : 0),
      tails: prev.tails + (side === "Tail" ? 1 : 0),
    }));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Coin Flipping Counter</h1>
      <Coin side={currentSide} />
      <button onClick={flipCoin} style={{ padding: "10px 20px", margin: "10px" }}>
        Flip Coin
      </button>
      <p>Heads: {flips.heads}</p>
      <p>Tails: {flips.tails}</p>
    </div>
  );
};

export default Counter;
