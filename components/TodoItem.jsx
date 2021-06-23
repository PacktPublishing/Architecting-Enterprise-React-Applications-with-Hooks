import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Markdown from "react-markdown";

export default function TodoItem({ children, onComplete, ...props }) {
  const [complete, setComplete] = useState(false);
  function toggleComplete() {
    setComplete((previouslyComplete) => !previouslyComplete);

    if (!complete && onComplete) {
      onComplete();
    }
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
        <Markdown>{children}</Markdown>
      </Form.Check.Label>
    </Form.Check>
  );
}
