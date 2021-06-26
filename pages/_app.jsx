import React from "react";
import LocaleContext from "../contexts/LocaleContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  return (
    <LocaleContext.Provider value="en-US">
      <Component {...pageProps} />
    </LocaleContext.Provider>
  );
}
