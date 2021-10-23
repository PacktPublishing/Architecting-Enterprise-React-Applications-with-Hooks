import Dexie, { liveQuery } from "dexie";

// Dexie `where` queries don't accept booleans
const FALSE = 0;
const TRUE = 1;

const db = new Dexie("TodoList");

db.version(3).stores({
  tasks: "++id, description, completed",
});

export default db;

export const addTask = async (description) =>
  await db.tasks.add({ description, completed: FALSE });

export const deleteTask = async (id) => await db.tasks.delete(id);

export const toggleTaskCompleted = async (id, prevCompleted) =>
  await db.tasks.update(id, { completed: prevCompleted ? FALSE : TRUE });

export const getAllTasks = async () =>
  (await db.tasks.toArray()).map((task) => ({
    ...task,
    completed: task.completed === TRUE,
  }));

export function subscribeToTaskList(onUpdate) {
  const taskListObservable = liveQuery(getAllTasks);
  const subscription = taskListObservable.subscribe({
    next: (tasks) => onUpdate(tasks),
    error: (error) => console.error(error),
  });
  return subscription.unsubscribe;
}

export const deleteAllCompletedTasks = async () =>
  await db.tasks.where("completed").equals(TRUE).delete();
