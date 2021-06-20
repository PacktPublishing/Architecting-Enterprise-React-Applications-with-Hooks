import React, { forwardRef, useState } from "react";
import { Col, Button, Form } from "react-bootstrap";

function TodoInput(props, ref) {
  const [description, setDescription] = useState("");

  return (
    <Form.Row {...props}>
      <Col>
        <Form.Control
          aria-label="To-do item input"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          ref={ref}
        />
      </Col>
      <Col xs="auto">
        <Button>Add</Button>
      </Col>
    </Form.Row>
  );
}
export default forwardRef(TodoInput);
