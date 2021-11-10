import React, { useContext, useState } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import { addTask as dbAddTask } from "../models/database";

export default function TodoInput(props) {
  const localizedStrings = useContext(LocalizationContext);

  const [inputValue, setInputValue] = useState("");

  async function addTask() {
    if (inputValue !== "") {
      await dbAddTask(inputValue);
      setInputValue("");
    }
  }

  return (
    <Row {...props}>
      <Col>
        <Form.Control
          aria-label={localizedStrings.inputLabel}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addTask();
          }}
        />
      </Col>

      <Col xs="auto">
        <Button onClick={addTask}>{localizedStrings.add}</Button>
      </Col>
    </Row>
  );
}
