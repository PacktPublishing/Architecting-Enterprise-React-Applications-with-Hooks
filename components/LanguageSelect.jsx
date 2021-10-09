import React, { useContext } from "react";
import {
  Col,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";

export default function LanguageSelect() {
  const { locale, setLocale, localizedStrings } =
    useContext(LocalizationContext);

  return (
    <Row className="m-3 justify-content-end">
      <Form.Label htmlFor="language-select" column xs="auto">
        {localizedStrings.language.label}
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
    </Row>
  );
}

function LanguageButton({ value, ...props }) {
  const { localizedStrings } = useContext(LocalizationContext);
  return (
    <ToggleButton
      id={`language-select-${value}`}
      value={value}
      variant="outline-primary"
      style={{ width: "6rem" }}
      {...props}
    >
      {localizedStrings.language[value]}
    </ToggleButton>
  );
}
