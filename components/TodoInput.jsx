import React, { useContext, useEffect, useRef } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import {
  addTask as dbAddTask,
  saveInputValue,
  getSavedInputValue,
} from "../models/database";

export default function TodoInput(props) {
  const { localizedStrings } = useContext(LocalizationContext);

  const inputRef = useRef(null);

  useEffect(() => {
    const inputElement = inputRef.current;

    (async function () {
      const savedInputValue = await getSavedInputValue();
      if (savedInputValue) {
        inputElement.value = savedInputValue;
      }
    })();

    function saveInput() {
      if (inputElement.value) saveInputValue(inputElement.value);
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
