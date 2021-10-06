import React, { useRef } from "react";
import anime from "animejs";
import TodoItem from "./TodoItem";

let renderNumber = 0;

export default function TodoList({ tasks, ...containerProps }) {
  console.log(`Starting TodoList render #${++renderNumber}`);

  const container = useRef(null);

  return (
    <div ref={container} {...containerProps}>
      {tasks.map(({ id, description, completed }) => (
        <TodoItem key={id} taskId={id} completed={completed}>
          {description}
        </TodoItem>
      ))}
    </div>
  );
}

function startWiggleAnimation(targets, startingIndex) {
  anime({
    targets,
    keyframes: [
      { translateX: 5 },
      { translateX: 0 },
      { translateX: -5 },
      { translateX: 0 },
    ],
    easing: "linear",
    duration: 200,
    delay: anime.stagger(90, { from: startingIndex }),
  });
}
