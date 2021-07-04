import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import { TASK_ACTIONS } from "../reducers/todoListReducer";

const { DELETE_ALL_COMPLETE } = TASK_ACTIONS;

export default function DeleteAllCompleteButton({ dispatch, ...props }) {
  const { localizedStrings } = useContext(LocalizationContext);

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
