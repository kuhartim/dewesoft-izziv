import { areTasksLoadedAtom, tasksAtom } from "@/atoms/tasks.atoms";
import { Task, TaskStatus } from "@/types/task.types";
import { useAtom, useAtomValue } from "jotai";

const useTasks = (searchString = "") => {
  const [tasks, setTasks] = useAtom<Task[]>(tasksAtom);
  const areTasksLoaded = useAtomValue(areTasksLoadedAtom);

  const addTask = (task: Omit<Task, "created" | "status">) => {
    const newTask: Task = {
      ...task,
      created: new Date().toISOString(),
      status: TaskStatus.TODO,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.created === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.created !== id));
  };

  // Sort tasks by importance and status
  const sortedTasks = tasks
    .slice() // Create a copy to avoid mutating the original array
    .filter((task) =>
      task.name.toLowerCase().includes(searchString.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by status: DOING > TODO > DONE
      const statusOrder = {
        [TaskStatus.DOING]: 1,
        [TaskStatus.TODO]: 2,
        [TaskStatus.DONE]: 3,
      };

      // If both tasks are DONE, sort by importance
      if (a.status === TaskStatus.DONE && b.status === TaskStatus.DONE) {
        if (a.important && !b.important) return -1;
        if (!a.important && b.important) return 1;
        return 0;
      }

      // If one task is DONE, it should be at the end
      if (a.status === TaskStatus.DONE) return 1;
      if (b.status === TaskStatus.DONE) return -1;

      // Sort by importance (important tasks first)
      if (a.important && !b.important) return -1;
      if (!a.important && b.important) return 1;

      // Sort by status
      return statusOrder[a.status] - statusOrder[b.status];
    });

  return {
    tasks: sortedTasks,
    addTask,
    updateTask,
    removeTask,
    isLoaded: areTasksLoaded,
  };
};

export default useTasks;
