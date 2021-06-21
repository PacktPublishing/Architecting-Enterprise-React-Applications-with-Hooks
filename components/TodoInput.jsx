import React, { forwardRef, useRef, useState } from "react";
import { Col, Button, Form } from "react-bootstrap";
import { throttle } from "lodash";

const addHistory = throttle(
  (historyRef, point) => historyRef.current.push(point),
  1000
);

function TodoInput(props, ref) {
  const [description, setDescription] = useState("");
  const history = useRef([]);

  function changeHandler(event) {
    setDescription(event.target.value);
    addHistory(history, description);
  }
  function undo() {
    setDescription(history.current.pop() ?? "");
  }

  return (
    <Form.Row {...props}>
      <Col>
        <Form.Control
          aria-label="To-do item input"
          value={description}
          onChange={changeHandler}
          ref={ref}
        />
      </Col>

      <Col xs="auto">
        <Button variant="warning" onClick={undo}>
          Undo
        </Button>
      </Col>
    </Form.Row>
  );
}
export default forwardRef(TodoInput);
