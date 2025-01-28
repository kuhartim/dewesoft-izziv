import { Task } from "@/types/task.types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const tasksAtom = atomWithStorage<Task[]>("tasks", []);
export const areTasksLoadedAtom = atom<boolean>(false);
