import React, { forwardRef, useContext, useState } from "react";
import { Col, Button, Form } from "react-bootstrap";
import LocaleContext from "../contexts/LocaleContext";
import localization from "../localization.json";

function TodoInput(props, ref) {
  const locale = useContext(LocaleContext);
  const localizedStrings = localization[locale].todoInput;

  const [description, setDescription] = useState("");

  return (
    <Form.Row {...props}>
      <Col>
        <Form.Control
          aria-label={localizedStrings.inputLabel}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          ref={ref}
        />
      </Col>
      <Col xs="auto">
        <Button>{localizedStrings.add}</Button>
      </Col>
    </Form.Row>
  );
}
export default forwardRef(TodoInput);
