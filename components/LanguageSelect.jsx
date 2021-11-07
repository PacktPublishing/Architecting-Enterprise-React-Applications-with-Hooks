import React, { Fragment, useContext } from "react";
import { Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";

export default function LanguageSelect({ locale, setLocale }) {
  const localizedStrings = useContext(LocalizationContext);

  return (
    <Form.Group as={Fragment}>
      <Form.Label htmlFor="language-select" className="m-0">
        {localizedStrings.language.label}
      </Form.Label>

      <ToggleButtonGroup
        type="radio"
        name="language-select"
        value={locale}
        onChange={setLocale}
      >
        <LanguageButton value="en-US" />
        <LanguageButton value="tlh" />
      </ToggleButtonGroup>
    </Form.Group>
  );
}

function LanguageButton({ value, ...props }) {
  const localizedStrings = useContext(LocalizationContext);
  return (
    <ToggleButton
      id={`language-select-${value}`}
      value={value}
      variant="outline-primary"
      style={{ width: "max-content" }}
      {...props}
    >
      {localizedStrings.language[value]}
    </ToggleButton>
  );
}
