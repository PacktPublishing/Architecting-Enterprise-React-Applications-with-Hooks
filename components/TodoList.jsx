import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, dispatch }) {
  return (
    <>
      {tasks
        .map(({ description, complete }, key) => (
          <TodoItem
            key={key}
            taskKey={key}
            complete={complete}
            dispatch={dispatch}
          >
            {description}
          </TodoItem>
        ))
        .toArray()}
    </>
  );
}
