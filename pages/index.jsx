import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { subscribeToTaskList } from "../models/database";
import { LocalizationContext } from "../contexts/localization";
import LanguageSelect from "../components/LanguageSelect";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import DeleteAllCompletedButton from "../components/DeleteAllCompletedButton";

let renderCount = 0;

export default function Home() {
  console.log(`Render #${++renderCount}`);

  const { localizedStrings } = useContext(LocalizationContext);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("Running database effect");
    const renderNumber = renderCount;

    function onDatabaseUpdate(newTasks) {
      console.log(
        `Calling the \`onDatabaseUpdate\` defined after render #${renderNumber}`
      );
      setTasks(newTasks);
    }
    const unsubscribe = subscribeToTaskList(onDatabaseUpdate);

    return function cleanup() {
      console.log(`Cleaning up database effect from render #${renderNumber}`);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log("Running page title effect");

    const incompleteTaskCount = tasks.filter((task) => !task.completed).length;
    document.title = `(${incompleteTaskCount}) ${localizedStrings.projectTitle}`;
  }, [tasks, localizedStrings.projectTitle]);

  return (
    <>
      <LanguageSelect />

      <div className="text-center">
        <Link href="/about">
          <a className="d-inline-block mb-3">About page link</a>
        </Link>
      </div>

      <Container fluid style={{ maxWidth: "720px" }} className="mt-5 mb-4">
        <h1 className="mb-5 text-center">{localizedStrings.projectTitle}</h1>

        <TodoInput className="mb-5" />
        <TodoList tasks={tasks} className="mb-4" />
        <DeleteAllCompletedButton className="d-block mx-auto" />
      </Container>
    </>
  );
}
