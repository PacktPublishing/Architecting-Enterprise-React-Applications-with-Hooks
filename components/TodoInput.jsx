import React, { useState } from "react";
import { Col, Button, Form } from "react-bootstrap";

export default function TodoInput(props) {
  const [description, setDescription] = useState("");

  return (
    <Form.Row {...props}>
      <Col>
        <Form.Control
          aria-label="To-do item input"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Col>
      <Col xs="auto">
        <Button>Add</Button>
      </Col>
    </Form.Row>
  );
}
