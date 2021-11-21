import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import LanguageSelect from "../components/LanguageSelect";
import { SettingsContext } from "../contexts/settings";
import TaskCountSettings from "../components/TaskCountSettings";

const formStyle = Object.freeze({
  display: "grid",
  gridTemplateColumns: "max-content min-content",
  alignItems: "center",
  gap: "1rem",
});

export default function Settings() {
  const settings = useContext(SettingsContext);
  const localizedStrings = useContext(LocalizationContext);

  return (
    <>
      <h1 className="mb-5 text-center">{localizedStrings.settings}</h1>

      <Form style={formStyle}>
        <LanguageSelect
          locale={settings.locale}
          setLocale={settings.set.locale}
        />

        <TaskCountSettings
          goodCount={settings.goodTaskCount}
          setGoodCount={settings.set.goodTaskCount}
          badCount={settings.badTaskCount}
          setBadCount={settings.set.badTaskCount}
        />
      </Form>
    </>
  );
}
