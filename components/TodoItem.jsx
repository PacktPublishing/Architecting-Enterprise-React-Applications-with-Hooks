import React, { useContext, useState } from "react";
import { Col, Form } from "react-bootstrap";
import TodoListDispatch from "../contexts/TodoListDispatch";
import { TASK_ACTIONS } from "../reducers/todoListReducer";
import DeleteButton from "./DeleteButton.jsx";

const { TOGGLE_COMPLETED, DELETE } = TASK_ACTIONS;

export default function TodoItem({
  children,
  taskKey,
  completed,
  ...checkboxProps
}) {
  const dispatch = useContext(TodoListDispatch);

  const toggleCompleted = () =>
    dispatch({ type: TOGGLE_COMPLETED, key: taskKey });
  const deleteTask = () => dispatch({ type: DELETE, key: taskKey });

  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <Form.Row
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="align-items-center"
      style={{ marginRight: 0 }}
    >
      <Col>
        <Form.Check
          {...checkboxProps}
          custom
          type="checkbox"
          id={`task-${taskKey}`}
        >
          <Form.Check.Input
            type="checkbox"
            checked={completed}
            onChange={toggleCompleted}
            style={{ cursor: "pointer" }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Form.Check.Label
            style={{
              textDecoration: completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {children}
          </Form.Check.Label>
        </Form.Check>
      </Col>

      <Col xs="auto" style={{ paddingRight: 0 }}>
        <DeleteButton visible={focused || hovered} onClick={deleteTask} />
      </Col>
    </Form.Row>
  );
}
