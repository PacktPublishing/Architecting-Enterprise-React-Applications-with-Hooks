import React, { createContext } from "react";
import localization from "../localization.json";

export const LocalizationContext = createContext();

export const LocalizationProvider = ({ locale, children }) => (
  <LocalizationContext.Provider value={localization[locale]}>
    {children}
  </LocalizationContext.Provider>
);
