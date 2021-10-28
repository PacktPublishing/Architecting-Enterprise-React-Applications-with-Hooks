import React, { forwardRef, useContext, useState } from "react";
import { Col, Button, Form } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";

function TodoInput(props, ref) {
  const { localizedStrings } = useContext(LocalizationContext);

  const [description, setDescription] = useState("");

  return (
    <Form.Row {...props}>
      <Col>
        <Form.Control
          aria-label={localizedStrings.todoInput.inputLabel}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          ref={ref}
        />
      </Col>
      <Col xs="auto">
        <Button>{localizedStrings.todoInput.add}</Button>
      </Col>
    </Form.Row>
  );
}
export default forwardRef(TodoInput);
