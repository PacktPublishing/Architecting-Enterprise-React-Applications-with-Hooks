import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  deleteTask as dbDeleteTask,
  toggleTaskCompleted as dbToggleTaskCompleted,
} from "../models/database";
import DeleteButton from "./DeleteButton.jsx";

export default function TodoItem({
  children,
  taskId,
  completed,
  onTaskCompletion,
  ...checkboxProps
}) {
  async function toggleCompleted() {
    const prevCompleted = completed;
    await dbToggleTaskCompleted(taskId, prevCompleted);
    if (!prevCompleted) onTaskCompletion();
  }
  const deleteTask = async () => await dbDeleteTask(taskId);

  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <Row
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="align-items-center"
      style={{ marginRight: 0 }}
    >
      <Col>
        <Form.Check
          {...checkboxProps}
          label
          type="checkbox"
          id={`task-${taskId}`}
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
    </Row>
  );
}
