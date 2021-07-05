import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        {/* prettier-ignore */}
        <Head>
          {/* Favicon graphic courtesy Twemoji v13.1
          Copyright 2020 Twitter, Inc and other contributors
          Licensed under CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
          Source: https://github.com/twitter/twemoji/blob/ff403353b5882d6d7037e289c7dc98e9b9747e2b/assets/svg/1fa9d.svg */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
