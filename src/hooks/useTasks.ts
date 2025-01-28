import { Task, TaskStatus } from "@/types/task.types";
import { useState, useEffect } from "react";

const loadTasksFromLocalStorage = (): Task[] => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// TODO: State managment for tasks, Jotai
const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage());

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

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

  return { tasks, addTask, updateTask, removeTask };
};

export default useTasks;
