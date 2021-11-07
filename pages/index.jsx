import React, { useContext, useEffect, useState } from "react";
import { subscribeToTaskList } from "../models/database";
import { LocalizationContext } from "../contexts/localization";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import DeleteAllCompletedButton from "../components/DeleteAllCompletedButton";

export default function Home() {
  const localizedStrings = useContext(LocalizationContext);

  const [{ tasks, dbConnected }, setTasksDbState] = useState({
    tasks: [],
    dbConnected: false,
  });
  const setTasks = (newTasks) =>
    setTasksDbState({ tasks: newTasks, dbConnected: true });
  useEffect(() => {
    function onDatabaseUpdate(newTasks) {
      setTasks(newTasks);
    }
    const unsubscribe = subscribeToTaskList(onDatabaseUpdate);

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  const incompleteTaskCount = tasks.filter((task) => !task.completed).length;
  useEffect(() => {
    document.title = `(${incompleteTaskCount}) ${localizedStrings.projectTitle}`;
  }, [incompleteTaskCount, localizedStrings.projectTitle]);

  return (
    dbConnected && (
      <>
        <h1 className="mb-5 text-center">{localizedStrings.projectTitle}</h1>

        <TodoInput className="mb-5" />
        <TodoList tasks={tasks} className="mb-4" />
        <DeleteAllCompletedButton className="d-block mx-auto" />
      </>
    )
  );
}
