import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { LocalizationContext } from "../contexts/localization";
import LanguageSelect from "../components/LanguageSelect";
import { SettingsContext } from "../contexts/settings";
import TaskCountSettings from "../components/TaskCountSettings";

export default function Settings() {
  const settings = useContext(SettingsContext);
  const localizedStrings = useContext(LocalizationContext);

  return (
    <>
      <h1 className="mb-5 text-center">{localizedStrings.settings}</h1>

      <Form
        style={{
          display: "grid",
          gridTemplateColumns: "max-content min-content",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <LanguageSelect
          locale={settings.locale.get()}
          setLocale={settings.locale.set}
        />

        <TaskCountSettings
          goodCount={settings.goodTaskCount.get()}
          setGoodCount={settings.goodTaskCount.set}
          badCount={settings.badTaskCount.get()}
          setBadCount={settings.badTaskCount.set}
        />
      </Form>
    </>
  );
}
