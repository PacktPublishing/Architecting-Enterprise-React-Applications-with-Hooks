import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { SettingsContext } from "./settings";
import localization from "../localization.json";

const supportedLocales = Object.keys(localization);

export const LocalizationContext = createContext();

export function LocalizationProvider({ children }) {
  const settings = useContext(SettingsContext);

  const [closestUserLocale, setClosestUserLocale] = useState("en-US");
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
        setClosestUserLocale(resolvedLocale);
        break;
      }
    }
  }, []);

  const locale = settings.locale.get() ?? closestUserLocale;

  return (
    <LocalizationContext.Provider value={localization[locale]}>
      {children}
    </LocalizationContext.Provider>
  );
}
