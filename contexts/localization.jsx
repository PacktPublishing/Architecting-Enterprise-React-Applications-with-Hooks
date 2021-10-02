import React, { createContext, useLayoutEffect, useState } from "react";
import clientSideOnly from "../components/hoc/clientSideOnly";
import localization from "../localization.json";

const supportedLocales = Object.keys(localization);

export const LocalizationContext = createContext();

export const LocalizationProvider = clientSideOnly(({ children }) => {
  const [locale, setLocale] = useState("tlh");

  useLayoutEffect(() => {
    const userLocales = (navigator?.languages ?? [navigator?.language]).filter(
      (language) => language != null
    );

    for (const userLocale of userLocales) {
      const userLanguage = userLocale.split("-")[0];
      const resolvedLocale =
        supportedLocales.find((locale) => locale === userLocale) ??
        supportedLocales.find((locale) => locale.startsWith(userLanguage));

      if (resolvedLocale) {
        setLocale(resolvedLocale);
        break;
      }
    }
  }, []);

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
});
