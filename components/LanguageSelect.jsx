import React, { useContext } from "react";
import { Col, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";

export default function LanguageSelect() {
  const { locale, setLocale, localizedStrings } =
    useContext(LocalizationContext);

  return (
    <Form.Row className="m-3 justify-content-end">
      <Form.Label htmlFor="language-select" column xs="auto">
        {localizedStrings.languageSelect.language}
      </Form.Label>

      <Col xs="auto">
        <ToggleButtonGroup
          type="radio"
          name="language-select"
          value={locale}
          onChange={setLocale}
        >
          <LanguageButton value="en-US" />
          <LanguageButton value="tlh" />
        </ToggleButtonGroup>
      </Col>
    </Form.Row>
  );
}

function LanguageButton({ value, ...props }) {
  const { localizedStrings } = useContext(LocalizationContext);
  return (
    <ToggleButton
      value={value}
      variant="outline-primary"
      style={{ width: "6rem" }}
      {...props}
    >
      {localizedStrings.languageSelect[value]}
    </ToggleButton>
  );
}
