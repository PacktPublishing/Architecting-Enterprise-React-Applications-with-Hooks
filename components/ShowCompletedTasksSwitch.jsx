import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";

export default function ShowCompletedTasksSwitch({ value, toggle, ...props }) {
  const localizedStrings = useContext(LocalizationContext);

  return (
    <div style={{ display: "flex", justifyContent: "end" }} {...props}>
      <Form.Check
        type="switch"
        id="show-completed-tasks"
        label={localizedStrings.showCompletedTasks}
        checked={value}
        onChange={toggle}
      />
    </div>
  );
}
