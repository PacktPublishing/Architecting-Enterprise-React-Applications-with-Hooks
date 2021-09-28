import React, { createContext, useState } from "react";
import localization from "../localization.json";

const supportedLocales = Object.keys(localization);

export const LocalizationContext = createContext();

export function LocalizationProvider({ children }) {
  const [locale, setLocale] = useState("en-US");

  return (
    <LocalizationContext.Provider
      value={{
        locale,
        setLocale,
        localizedStrings: localization[locale],
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}
