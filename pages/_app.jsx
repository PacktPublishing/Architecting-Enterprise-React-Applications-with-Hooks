import React from "react";
import { LocalizationProvider } from "../contexts/localization";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  return (
    <LocalizationProvider locale="en-US">
      <Component {...pageProps} />
    </LocalizationProvider>
  );
}
