import { areTasksLoadedAtom, tasksAtom } from "@/atoms/tasks.atoms";
import { useSetAtom } from "jotai";
// import { useHydrateAtoms } from "jotai/utils";
import { useEffect } from "react";

const useHydrateTasks = () => {
  // This makes hydration error

  //   useHydrateAtoms([
  //     [
  //       tasksAtom,
  //       (() => {
  //         if (typeof window === "undefined") return [];
  //         const valueInLocalStorage = localStorage.getItem("tasks");
  //         if (valueInLocalStorage) {
  //           try {
  //             return JSON.parse(valueInLocalStorage);
  //           } catch {
  //             return [];
  //           }
  //         }
  //         return [];
  //       })(),
  //     ],
  //   ]);

  // This is the alternative
  const setTasks = useSetAtom(tasksAtom);
  const setAreLoaded = useSetAtom(areTasksLoadedAtom);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const valueInLocalStorage = localStorage.getItem("tasks");
      if (valueInLocalStorage) {
        try {
          setTasks(JSON.parse(valueInLocalStorage));
        } catch {
          setTasks([]);
        }
      }

      setAreLoaded(true);
    }
  }, [setTasks, setAreLoaded]);
};

export default useHydrateTasks;
