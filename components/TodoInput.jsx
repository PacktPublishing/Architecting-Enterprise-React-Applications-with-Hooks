import React, { useContext, useMemo } from "react";
import { Col, Button, Form, Row } from "react-bootstrap";
import chroma from "chroma-js";
import css from "styled-jsx/css";
import { LocalizationContext } from "../contexts/localization";
import { SettingsContext } from "../contexts/settings";
import { addTask as dbAddTask } from "../models/database";

const SUCCESS_COLOR = "#28a745";
const WARNING_COLOR = "#e3a900";
const DANGER_COLOR = "#dc3545";

export default function TodoInput({
  inputValue,
  setInputValue,
  incompleteTaskCount,
  ...props
}) {
  const settings = useContext(SettingsContext);
  const localizedStrings = useContext(LocalizationContext);

  async function addTask() {
    if (inputValue !== "") {
      await dbAddTask(inputValue);
      setInputValue("");
    }
  }

  const t0 = performance.now();
  const addButtonCss = useMemo(() => {
    const colorScale = chroma
      .scale([SUCCESS_COLOR, WARNING_COLOR, DANGER_COLOR])
      .mode("lrgb")
      .domain([settings.goodTaskCount, settings.badTaskCount]);
    const baseColor = colorScale(incompleteTaskCount).hex();
    const hoverFocusColor = chroma.mix(baseColor, "black", 0.15).hex();
    const hoverFocusBorderColor = chroma.mix(baseColor, "black", 0.2).hex();
    const focusShadowColor = chroma
      .mix(baseColor, "white", 0.15)
      .alpha(0.5)
      .css();
    return css.resolve`
      button {
        background-color: ${baseColor};
        border-color: ${baseColor};
      }
      button:hover {
        background-color: ${hoverFocusColor};
        border-color: ${hoverFocusBorderColor};
      }
      button:focus {
        background-color: ${hoverFocusColor};
        border-color: ${hoverFocusBorderColor};
        box-shadow: 0 0 0 0.25rem ${focusShadowColor};
      }
    `;
  }, [incompleteTaskCount, settings.badTaskCount, settings.goodTaskCount]);
  const t1 = performance.now();
  console.log(`'useMemo' call took ${t1 - t0} ms.`);

  return (
    <Row {...props}>
      <Col>
        <Form.Control
          aria-label={localizedStrings.inputLabel}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addTask();
          }}
        />
      </Col>

      <Col xs="auto">
        <Button onClick={addTask} className={addButtonCss.className}>
          {localizedStrings.add}
        </Button>
        {addButtonCss.styles}
      </Col>
    </Row>
  );
}
