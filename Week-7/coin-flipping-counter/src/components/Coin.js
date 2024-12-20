import React from "react";

const Coin = ({ side }) => {
  const isHead = side === "Head";

  const circleStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: isHead ? "#ffcc00" : "#00ccff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#fff",
    margin: "20px auto",
  };

  return <div style={circleStyle}>{side}</div>;
};

export default Coin;
