import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks }) {
  return (
    <>
      {tasks
        .map(({ description, complete }, key) => (
          <TodoItem key={key} taskKey={key} complete={complete}>
            {description}
          </TodoItem>
        ))
        .toArray()}
    </>
  );
}
