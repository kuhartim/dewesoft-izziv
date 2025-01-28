"use client";
import NewTask from "@/components/new-task";
import Task from "@/components/task";
import useHydrateTasks from "@/hooks/useHydrateTasks";
import useTasks from "@/hooks/useTasks";
import { TaskStatus } from "@/types/task.types";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";
import SearchInput from "@/components/search";
import StatsComponent from "@/components/stats";

export default function Page() {
  useHydrateTasks();
  const [searchString, setSearchString] = useState("");
  const { tasks, isLoaded, updateTask, removeTask } = useTasks(searchString);

  const onImportantToggle = (id: string, important: boolean) => {
    updateTask(id, { important });
  };
  const onStatusChange = (id: string, status: TaskStatus) => {
    updateTask(id, { status });
  };
  const onTaskDelete = (id: string) => {
    removeTask(id);
  };

  console.log("tasks", tasks);

  return (
    <Stack
      maxWidth={600}
      mx="auto"
      p="4"
      alignItems="center"
      width="100%"
      gap="4"
    >
      <Stack gap="4" width="100%">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Heading>Tasks</Heading>
          <NewTask />
        </Box>
        <StatsComponent />
        <SearchInput
          value={searchString}
          onChange={setSearchString}
          placeholder="Search tasks"
        />
      </Stack>
      {!isLoaded && <Spinner />}
      {tasks.length === 0 && isLoaded && (
        <Text color="gray.400" textAlign="center" wordBreak="break-all">
          {searchString
            ? `No tasks found for "${searchString}"`
            : "No tasks yet"}
        </Text>
      )}
      <Stack width="100%">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.created}
              layout="position"
              initial={{ opacity: 0, y: -20 }} // Initial animation state
              animate={{ opacity: 1, y: 0 }} // Animate to this state
              exit={{ opacity: 0, y: -20 }} // Animate when removed
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.2,
              }} // Smooth spring animation
            >
              <Task
                text={task.name}
                status={task.status}
                important={task.important}
                onImportantToggle={() =>
                  onImportantToggle(task.created, !task.important)
                }
                onStatusChange={(newStatus) =>
                  onStatusChange(task.created, newStatus)
                }
                onDelete={() => onTaskDelete(task.created)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </Stack>
    </Stack>
  );
}
