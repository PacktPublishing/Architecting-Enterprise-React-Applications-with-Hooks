import React, { useContext, useEffect, useState } from "react";
import { subscribeToTaskList } from "../models/database";
import { LocalizationContext } from "../contexts/localization";
import ShowCompletedTasksSwitch from "../components/ShowCompletedTasksSwitch";
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

  const incompleteTasks = tasks.filter((task) => !task.completed);

  useEffect(() => {
    document.title = `(${incompleteTasks.length}) ${localizedStrings.projectTitle}`;
  }, [incompleteTasks, localizedStrings.projectTitle]);

  const [showCompleted, setShowCompleted] = useState(false);

  return (
    dbConnected && (
      <>
        <h1 className="mb-5 text-center">{localizedStrings.projectTitle}</h1>

        <TodoInput
          incompleteTaskCount={incompleteTasks.length}
          className="mb-4"
        />
        <ShowCompletedTasksSwitch
          value={showCompleted}
          toggle={() => setShowCompleted((prev) => !prev)}
          className="mb-2"
        />
        <TodoList
          tasks={showCompleted ? tasks : incompleteTasks}
          className="mb-4"
        />
        <DeleteAllCompletedButton className="d-block mx-auto" />
      </>
    )
  );
}
