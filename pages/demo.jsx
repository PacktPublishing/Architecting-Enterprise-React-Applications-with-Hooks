import React, { useEffect, useRef, useState } from "react";
import RandomBox from "../components/RandomBox";
import computeExpensiveValue from "../utils/computeExpensiveValue";

export default function Demo() {
  const randomBox = useRef(null);

  const [count, setCount] = useState(0);
  const incrementCount = () => setCount((prevCount) => prevCount + 1);

  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const newPosition = computeExpensiveValue({
      x: randomBox.current.offsetWidth / 2,
      y: randomBox.current.offsetHeight / 2,
    });
    setCirclePosition(newPosition);
  }, [count]);

  return (
    <>
      <RandomBox ref={randomBox} onClick={incrementCount} />
      <Circle {...circlePosition} count={count} />
    </>
  );
}

const Circle = ({ x, y, count }) => (
  <div
    style={{
      position: "absolute",
      width: 30,
      height: 30,
      left: x - 15,
      top: y - 15,
      borderRadius: "50%",
      backgroundColor: "red",
      color: "white",
      textAlign: "center",
      zIndex: -1,
    }}
  >
    <span style={{ verticalAlign: "middle" }}>{count}</span>
  </div>
);
