import React, { useContext, useLayoutEffect, useRef } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import { addTask as dbAddTask } from "../models/database";
import { SAVED_INPUT } from "../models/localStorage-keys";

export default function TodoInput(props) {
  const { localizedStrings } = useContext(LocalizationContext);

  const inputRef = useRef(null);

  useLayoutEffect(() => {
    const inputElement = inputRef.current;

    const savedInputValue = localStorage.getItem(SAVED_INPUT);
    if (savedInputValue) {
      inputElement.value = savedInputValue;
      localStorage.removeItem(SAVED_INPUT);
    }

    function saveInput() {
      if (inputElement.value)
        localStorage.setItem(SAVED_INPUT, inputElement.value);
    }
    window.addEventListener("beforeunload", saveInput);
    return function cleanup() {
      saveInput();
      window.removeEventListener("beforeunload", saveInput);
    };
  }, []);

  async function addTask() {
    if (inputRef.current.value !== "") {
      await dbAddTask(inputRef.current.value);
      inputRef.current.value = "";
    }
  }

  return (
    <Row {...props}>
      <Col>
        <Form.Control
          aria-label={localizedStrings.inputLabel}
          ref={inputRef}
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
