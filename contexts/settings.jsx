import React, { createContext, useLayoutEffect, useState } from "react";
import { merge } from "immutable";
import { SETTINGS } from "../models/localStorage-keys";

export const SettingsContext = createContext();

const defaultSettings = {
  locale: null,
};

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

  const settingsContext = {};
  for (const [key, value] of Object.entries(settings)) {
    settingsContext[key] = {
      get: () => value,
      set: (newValue) => updateLocalAndStoredSettings({ [key]: newValue }),
    };
  }

  return (
    <SettingsContext.Provider value={settingsContext}>
      {children}
    </SettingsContext.Provider>
  );
}
