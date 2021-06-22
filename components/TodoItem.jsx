import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";

export default function TodoItem({ children, onComplete, ...props }) {
  const [complete, setComplete] = useState(false);
  function toggleComplete() {
    setComplete((previouslyComplete) => !previouslyComplete);

    if (!complete && onComplete) {
      onComplete();
    }
  }

  const intervalId = useRef(null);
  function handleClick() {
    if (!intervalId.current) {
      toggleComplete();
      intervalId.current = setInterval(toggleComplete, 500);
    } else {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }

  return (
    <Form.Check type="checkbox" {...props}>
      <Form.Check.Input
        type="checkbox"
        checked={complete}
        onChange={handleClick}
        style={{ cursor: "pointer" }}
      />
      <Form.Check.Label
        style={{
          textDecoration: complete ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {children}
      </Form.Check.Label>
    </Form.Check>
  );
}
