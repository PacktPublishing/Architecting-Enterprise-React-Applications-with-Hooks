import React, { createContext, useState } from "react";
import localization from "../localization.json";

const supportedLocales = Object.keys(localization);
const DEFAULT_LOCALE = "tlh";

export const LocalizationContext = createContext();

export function LocalizationProvider({ initialLocale, children }) {
  const [locale, setLocale] = useState(initialLocale);

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

export function getInitialLocale(appContext) {
  const acceptLanguage = appContext.ctx.req.headers["accept-language"];
  const userLocales = acceptLanguage
    .split(",")
    .map((locale) => locale.split(";")[0].trim());

  for (const userLocale of userLocales) {
    const userLanguage = userLocale.split("-")[0];
    const resolvedLocale =
      supportedLocales.find((locale) => locale === userLocale) ??
      supportedLocales.find((locale) => locale.startsWith(userLanguage));

    if (resolvedLocale) {
      return resolvedLocale;
    }
  }

  return DEFAULT_LOCALE;
}
