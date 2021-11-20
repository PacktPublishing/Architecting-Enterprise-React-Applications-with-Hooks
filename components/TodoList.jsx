import React, { useEffect, useRef } from "react";
import anime from "animejs";
import TodoItem from "./TodoItem";

function TodoList({ tasks, ...containerProps }) {
  const container = useRef(null);
  const lastCompletedIndex = useRef(null);
  const setLastCompletedIndex = (index) => {
    lastCompletedIndex.current = index;
  };
  const allTasksCompleted = tasks.every((task) => task.completed);
  const allTasksPrevCompleted = useRef(null);
  useEffect(() => {
    if (allTasksPrevCompleted.current === false && allTasksCompleted) {
      startWiggleAnimation(
        container.current.children,
        lastCompletedIndex.current
      );
    }

    allTasksPrevCompleted.current = allTasksCompleted;
  }, [allTasksCompleted]);

  return (
    <div ref={container} {...containerProps}>
      {tasks.map(({ id, description, completed }, index) => (
        <TodoItem
          key={id}
          taskId={id}
          completed={completed}
          onTaskCompletion={() => setLastCompletedIndex(index)}
        >
          {description}
        </TodoItem>
      ))}
    </div>
  );
}
export default React.memo(TodoList);

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
