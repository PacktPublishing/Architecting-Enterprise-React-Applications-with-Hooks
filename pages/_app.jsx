import React from "react";
import NextApp from "next/app";
import {
  getInitialLocale,
  LocalizationProvider,
} from "../contexts/localization";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ initialLocale, Component, pageProps }) {
  return (
    <LocalizationProvider initialLocale={initialLocale}>
      <Component {...pageProps} />
    </LocalizationProvider>
  );
}

App.getInitialProps = async (appContext) => {
  const appPropsTask = NextApp.getInitialProps(appContext);
  return {
    initialLocale: getInitialLocale(appContext),
    ...(await appPropsTask),
  };
};
