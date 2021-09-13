import React, { forwardRef, useContext, useState } from "react";
import { Col, Button, Form } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import { addTask as dbAddTask } from "../models/database";

function TodoInput(props, ref) {
  const { localizedStrings } = useContext(LocalizationContext);

  const [description, setDescription] = useState("");
  async function addTask() {
    if (description !== "") {
      await dbAddTask(description);
      setDescription("");
    }
  }

  return (
    <Form.Row {...props}>
      <Col>
        <Form.Control
          aria-label={localizedStrings.inputLabel}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addTask();
          }}
          ref={ref}
        />
      </Col>

      <Col xs="auto">
        <Button onClick={addTask}>{localizedStrings.add}</Button>
      </Col>
    </Form.Row>
  );
}
export default forwardRef(TodoInput);
