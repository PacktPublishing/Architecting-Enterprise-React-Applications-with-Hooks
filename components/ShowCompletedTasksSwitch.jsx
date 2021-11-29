import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";

let renderCount = 0;

function ShowCompletedTasksSwitch({ value, toggle, ...props }) {
  console.log(`ShowCompletedTasksSwitch render #${++renderCount}`);

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
export default React.memo(ShowCompletedTasksSwitch);
