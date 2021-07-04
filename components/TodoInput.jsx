import React, { forwardRef, useContext, useState } from "react";
import { Col, Button, Form } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import { TASK_ACTIONS } from "../reducers/todoListReducer";

const { ADD } = TASK_ACTIONS;

function TodoInput({ dispatch, ...rowProps }, ref) {
  const { localizedStrings } = useContext(LocalizationContext);

  const [description, setDescription] = useState("");
  function addTask() {
    if (description !== "") {
      dispatch({ type: ADD, description });
      setDescription("");
    }
  }

  return (
    <Form.Row {...rowProps}>
      <Col>
        <Form.Control
          aria-label={localizedStrings.todoInput.inputLabel}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addTask();
          }}
          ref={ref}
        />
      </Col>

      <Col xs="auto">
        <Button onClick={addTask}>{localizedStrings.todoInput.add}</Button>
      </Col>
    </Form.Row>
  );
}
export default forwardRef(TodoInput);
