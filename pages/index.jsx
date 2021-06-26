import React, { useContext } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import LocalizationContext from "../contexts/LocalizationContext";

export default function Home() {
  const { indexPage: localizedStrings } = useContext(LocalizationContext);

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
