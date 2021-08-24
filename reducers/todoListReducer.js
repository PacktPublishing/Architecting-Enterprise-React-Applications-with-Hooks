import { OrderedMap, Record } from "immutable";
import { nanoid } from "nanoid";

const Task = Record({ description: "", complete: false });

export const initialTasks = OrderedMap();

export const TASK_ACTIONS = Object.freeze({
  ADD: "add",
  TOGGLE_COMPLETE: "toggle-complete",
  DELETE: "delete",
  DELETE_ALL_COMPLETE: "delete-all-complete",
});

export default function todoListReducer(prevTasks, action) {
  const { ADD, TOGGLE_COMPLETE, DELETE, DELETE_ALL_COMPLETE } = TASK_ACTIONS;

  switch (action.type) {
    case ADD:
      return prevTasks.set(nanoid(), Task({ description: action.description }));

    case TOGGLE_COMPLETE:
      return prevTasks.updateIn([action.key], (task) =>
        task.set("complete", !task.complete)
      );

    case DELETE:
      return prevTasks.delete(action.key);

    case DELETE_ALL_COMPLETE:
      return prevTasks.filter((task) => !task.complete);

    default:
      throw new Error(`'${action.type}' is not a valid action type.`);
  }
}
