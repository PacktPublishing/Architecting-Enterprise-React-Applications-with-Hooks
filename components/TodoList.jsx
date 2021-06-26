import React, { useContext } from "react";
import LocalizationContext from "../contexts/LocalizationContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todoList: localizedStrings } = useContext(LocalizationContext);

  return (
    <TodoItem id="example-todo">
      {localizedStrings.exampleTodoDescription}
    </TodoItem>
  );
}
