import React, { forwardRef, useState } from "react";
import { random } from "lodash";

function RandomBox({ onClick }, ref) {
  const [dimensions, setDimensions] = useState({
    width: random(50, 500),
    height: random(50, 500),
  });
  function handleClick() {
    setDimensions({
      width: random(50, 500),
      height: random(50, 500),
    });
    onClick();
  }

  return (
    <div
      ref={ref}
      style={{
        ...dimensions,
        position: "absolute",
        border: "solid black",
        cursor: "pointer",
      }}
      onClick={handleClick}
    />
  );
}

export default forwardRef(RandomBox);
