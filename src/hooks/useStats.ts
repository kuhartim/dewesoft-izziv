import { areTasksLoadedAtom, tasksAtom } from "@/atoms/tasks.atoms";
import { TaskStatus } from "@/types/task.types";
import { useAtomValue } from "jotai";

const useStats = () => {
  const tasks = useAtomValue(tasksAtom);
  const areTasksLoaded = useAtomValue(areTasksLoadedAtom);

  const totalTasks = tasks.length;
  const tasksToDo = tasks.filter(
    (task) => task.status === TaskStatus.TODO
  ).length;
  const tasksDoing = tasks.filter(
    (task) => task.status === TaskStatus.DOING
  ).length;
  const tasksDone = tasks.filter(
    (task) => task.status === TaskStatus.DONE
  ).length;

  return {
    totalTasks,
    tasksToDo,
    tasksDoing,
    tasksDone,
    isLoaded: areTasksLoaded,
  };
};

export default useStats;
