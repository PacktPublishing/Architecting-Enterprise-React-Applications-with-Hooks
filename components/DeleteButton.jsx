import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { merge } from "lodash";
import { LocalizationContext } from "../contexts/localization";

export default function DeleteButton({ visible, style, className, ...props }) {
  const { localizedStrings } = useContext(LocalizationContext);

  return (
    <Button
      aria-label={localizedStrings.deleteTask}
      variant="link"
      as="a"
      role="button"
      tabIndex={0}
      className={clsx("text-danger", className)}
      style={merge({ visibility: visible ? "visible" : "hidden" }, style)}
      {...props}
    >
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
}
