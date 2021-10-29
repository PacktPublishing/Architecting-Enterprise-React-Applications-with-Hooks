import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import { deleteAllCompletedTasks } from "../models/database";

export default function DeleteAllCompletedButton(props) {
  const localizedStrings = useContext(LocalizationContext);

  return (
    <Button variant="danger" onClick={deleteAllCompletedTasks} {...props}>
      {localizedStrings.deleteAllCompleted}
    </Button>
  );
}
