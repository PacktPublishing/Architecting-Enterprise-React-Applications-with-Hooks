import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";

export default function Home() {
  return (
    <Container fluid style={{ maxWidth: "720px" }} className="mt-5">
      <Head>
        <title>To-Do List Project</title>
      </Head>

      <h1 className="mb-5" style={{ textAlign: "center" }}>
        To-Do List Project
      </h1>

      <TodoInput className="mb-5" />

      <TodoItem id="example-todo">Learn how to use `useContext`.</TodoItem>
    </Container>
  );
}
