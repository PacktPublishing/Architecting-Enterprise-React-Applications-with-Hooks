import React from "react";
import LocalizationContext from "../contexts/LocalizationContext";
import localization from "../localization.json";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  return (
    <LocalizationContext.Provider value={localization["en-US"]}>
      <Component {...pageProps} />
    </LocalizationContext.Provider>
  );
}
