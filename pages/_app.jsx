import React from "react";
import { SettingsProvider } from "../contexts/settings";
import { LocalizationProvider } from "../contexts/localization";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <LocalizationProvider>
        <Component {...pageProps} />
      </LocalizationProvider>
    </SettingsProvider>
  );
}
