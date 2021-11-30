import React, {
  createContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
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

  const setters = useMemo(() => {
    const setters = {};
    for (const key in defaultSettings) {
      setters[key] = (newValue) =>
        updateLocalAndStoredSettings({ [key]: newValue });
    }
    return setters;
  }, []);

  const contextValue = useMemo(
    () => ({ ...settings, set: setters }),
    [setters, settings]
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}
