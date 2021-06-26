import React, { useContext } from "react";
import LocaleContext from "../contexts/LocaleContext";
import localization from "../localization.json";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const locale = useContext(LocaleContext);
  const localizedStrings = localization[locale].todoList;

  return (
    <TodoItem id="example-todo">
      {localizedStrings.exampleTodoDescription}
    </TodoItem>
  );
}
