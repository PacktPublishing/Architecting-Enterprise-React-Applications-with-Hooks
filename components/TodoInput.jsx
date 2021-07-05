import React, { forwardRef, useContext, useState } from "react";
import { Col, Button, Form } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import TodoListDispatch from "../contexts/TodoListDispatch";
import { TASK_ACTIONS } from "../reducers/todoListReducer";

const { ADD } = TASK_ACTIONS;

function TodoInput(props, ref) {
  const { localizedStrings } = useContext(LocalizationContext);
  const dispatch = useContext(TodoListDispatch);

  const [description, setDescription] = useState("");
  function addTask() {
    if (description !== "") {
      dispatch({ type: ADD, description });
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
