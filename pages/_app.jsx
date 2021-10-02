import React from "react";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";

const LocalizationProvider = dynamic(
  () =>
    import("../contexts/localization").then(
      (module) => module.LocalizationProvider
    ),
  { ssr: false }
);

export default function App({ Component, pageProps }) {
  return (
    <LocalizationProvider>
      <Component {...pageProps} />
    </LocalizationProvider>
  );
}
