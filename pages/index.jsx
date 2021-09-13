import React, { useContext, useEffect, useReducer, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import LanguageSelect from "../components/LanguageSelect";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import DeleteAllCompleteButton from "../components/DeleteAllCompleteButton";
import todoListReducer, { initialTasks } from "../reducers/todoListReducer";
import TodoListDispatch from "../contexts/TodoListDispatch";

let renderCount = 0;

export default function Home() {
  console.log(`Render #${++renderCount}`);

  const { localizedStrings } = useContext(LocalizationContext);

  const [tasks, dispatch] = useReducer(todoListReducer, initialTasks);

  useEffect(() => {
    console.log("Running page title effect");

    const incompleteTaskCount = tasks.filter((task) => !task.complete).size;
    document.title = `(${incompleteTaskCount}) ${localizedStrings.projectTitle}`;
  }, [tasks, localizedStrings.projectTitle]);

  const [switchState, setSwitchState] = useState(false);

  return (
    <>
      <LanguageSelect />

      <div className="text-center">
        <Form.Check
          type="switch"
          id="meaningless-switch"
          label="Meaningless switch"
          checked={switchState}
          onChange={() => setSwitchState((s) => !s)}
        />
      </div>

      <Container fluid style={{ maxWidth: "720px" }} className="mt-5 mb-4">
        <h1 className="mb-5 text-center">{localizedStrings.projectTitle}</h1>

        <TodoListDispatch.Provider value={dispatch}>
          <TodoInput className="mb-5" />

          <TodoList tasks={tasks} className="mb-4" />

          <DeleteAllCompleteButton className="d-block mx-auto" />
        </TodoListDispatch.Provider>
      </Container>
    </>
  );
}
