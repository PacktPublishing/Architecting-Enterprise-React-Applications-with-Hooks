import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, ...containerProps }) {
  return (
    <div {...containerProps}>
      {tasks.map(({ id, description, completed }) => (
        <TodoItem key={id} taskId={id} completed={completed}>
          {description}
        </TodoItem>
      ))}
    </div>
  );
}
