import React from "react";
import { Form } from "react-bootstrap";
import Markdown from "react-markdown";

export default function TodoItem({
  children,
  taskKey,
  complete,
  ...checkboxProps
}) {
  function toggleComplete() {}

  return (
    <Form.Check {...checkboxProps} type="checkbox" id={`task-${taskKey}`}>
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
        <Markdown
          allowedElements={["a", "code", "em", "p", "strong"]}
          // eslint-disable-next-line react/display-name, no-unused-vars
          components={{ p: ({ node, ...props }) => <span {...props} /> }}
        >
          {children}
        </Markdown>
      </Form.Check.Label>
    </Form.Check>
  );
}
