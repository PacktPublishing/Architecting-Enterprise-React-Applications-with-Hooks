import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, ...containerProps }) {
  return (
    <div {...containerProps}>
      {tasks
        .map(({ description, completed }, key) => (
          <TodoItem key={key} taskKey={key} completed={completed}>
            {description}
          </TodoItem>
        ))
        .toArray()}
    </div>
  );
}
