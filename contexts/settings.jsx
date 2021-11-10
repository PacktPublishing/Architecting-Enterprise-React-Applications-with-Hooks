import React, { createContext, useLayoutEffect, useState } from "react";
import { merge } from "immutable";
import { SETTINGS } from "../models/localStorage-keys";

export const SettingsContext = createContext();

const defaultSettings = Object.freeze({
  locale: null,
  goodTaskCount: 3,
  badTaskCount: 10,
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  function updateLocalAndStoredSettings(newSettings) {
    setSettings((prevSettings) => {
      const mergedSettings = merge(prevSettings, newSettings);
      localStorage.setItem(SETTINGS, JSON.stringify(mergedSettings));
      return mergedSettings;
    });
  }

  useLayoutEffect(() => {
    const settingsJson = localStorage.getItem(SETTINGS);
    updateLocalAndStoredSettings(settingsJson ? JSON.parse(settingsJson) : {});
  }, []);

  const setters = {};
  for (const key in defaultSettings) {
    setters[key] = (newValue) =>
      updateLocalAndStoredSettings({ [key]: newValue });
  }

  return (
    <SettingsContext.Provider value={{ ...settings, set: setters }}>
      {children}
    </SettingsContext.Provider>
  );
}
