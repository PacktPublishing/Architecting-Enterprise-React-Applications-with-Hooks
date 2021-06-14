import React from "react";
import Head from "next/head";
import { Container } from "theme-ui";
import { H1 } from "../components/headings";
import TodoInput from "../components/TodoInput";

export default function Home() {
  return (
    <Container variant="md" mt={5}>
      <Head>
        <title>To-Do List Project</title>
      </Head>

      <H1 mb={5} sx={{ textAlign: "center" }}>
        To-Do List Project
      </H1>

      <TodoInput />
    </Container>
  );
}
