import { OrderedMap, Record } from "immutable";
import { nanoid } from "nanoid";

const Task = Record({ description: "", completed: false });

export const initialTasks = OrderedMap();

export const TASK_ACTIONS = Object.freeze({
  ADD: "add",
  TOGGLE_COMPLETED: "toggle-completed",
  DELETE: "delete",
  DELETE_ALL_COMPLETED: "delete-all-completed",
});

export default function todoListReducer(prevTasks, action) {
  const { ADD, TOGGLE_COMPLETED, DELETE, DELETE_ALL_COMPLETED } = TASK_ACTIONS;

  switch (action.type) {
    case ADD:
      return prevTasks.set(nanoid(), Task({ description: action.description }));

    case TOGGLE_COMPLETED:
      return prevTasks.updateIn([action.key], (task) =>
        task.set("completed", !task.completed)
      );

    case DELETE:
      return prevTasks.delete(action.key);

    case DELETE_ALL_COMPLETED:
      return prevTasks.filter((task) => !task.completed);

    default:
      throw new Error(`'${action.type}' is not a valid action type.`);
  }
}
