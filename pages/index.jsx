import React, { useContext } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { LocalizationContext } from "../contexts/localization";

export default function Home() {
  const { localizedStrings } = useContext(LocalizationContext);

  return (
    <Container fluid style={{ maxWidth: "720px" }} className="mt-5">
      <Head>
        <title>{localizedStrings.indexPage.projectTitle}</title>
      </Head>

      <h1 className="mb-5" style={{ textAlign: "center" }}>
        {localizedStrings.indexPage.projectTitle}
      </h1>

      <TodoInput className="mb-5" />

      <TodoList />
    </Container>
  );
}
