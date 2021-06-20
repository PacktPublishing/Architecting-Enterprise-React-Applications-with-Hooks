import React, { useRef } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import TodoInput from "../components/TodoInput";
import TodoItem from "../components/TodoItem";

export default function Home() {
  const inputRef = useRef();
  const onTodoComplete = () => inputRef.current.focus();

  return (
    <Container fluid style={{ maxWidth: "720px" }} className="mt-5">
      <Head>
        <title>To-Do List Project</title>
      </Head>

      <h1 className="mb-5" style={{ textAlign: "center" }}>
        To-Do List Project
      </h1>

      <TodoInput ref={inputRef} className="mb-5" />

      <TodoItem id="example-todo" onComplete={onTodoComplete}>
        Learn how to use <code>useRef</code>.
      </TodoItem>
    </Container>
  );
}
