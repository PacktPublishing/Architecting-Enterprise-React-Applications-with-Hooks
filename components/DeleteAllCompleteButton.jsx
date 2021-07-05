import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import TodoListDispatch from "../contexts/TodoListDispatch";
import { TASK_ACTIONS } from "../reducers/todoListReducer";

const { DELETE_ALL_COMPLETE } = TASK_ACTIONS;

export default function DeleteAllCompleteButton(props) {
  const { localizedStrings } = useContext(LocalizationContext);

  const dispatch = useContext(TodoListDispatch);

  return (
    <Button
      variant="danger"
      onClick={() => dispatch({ type: DELETE_ALL_COMPLETE })}
      {...props}
    >
      {localizedStrings.deleteAllComplete}
    </Button>
  );
}
