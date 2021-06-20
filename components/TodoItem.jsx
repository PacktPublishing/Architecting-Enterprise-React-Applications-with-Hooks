import React, { useState } from "react";
import { Form } from "react-bootstrap";

export default function TodoItem({ children, ...props }) {
  const [complete, setComplete] = useState(false);
  function toggleComplete() {
    console.log("Calling setComplete the first time...");
    setComplete((previouslyComplete) => !previouslyComplete);

    setTimeout(() => {
      console.log("Calling setComplete the second time.");
      setComplete((previouslyComplete) => !previouslyComplete);
    }, 3000);
  }

  return (
    <Form.Check type="checkbox" {...props}>
      <Form.Check.Input
        type="checkbox"
        checked={complete}
        onChange={toggleComplete}
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
