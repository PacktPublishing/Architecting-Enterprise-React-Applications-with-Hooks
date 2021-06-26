import React, { useContext } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import LocaleContext from "../contexts/LocaleContext";
import localization from "../localization.json";

export default function Home() {
  const locale = useContext(LocaleContext);
  const localizedStrings = localization[locale].indexPage;

  return (
    <Container fluid style={{ maxWidth: "720px" }} className="mt-5">
      <Head>
        <title>{localizedStrings.projectTitle}</title>
      </Head>

      <h1 className="mb-5" style={{ textAlign: "center" }}>
        {localizedStrings.projectTitle}
      </h1>

      <TodoInput className="mb-5" />

      <TodoList />
    </Container>
  );
}
