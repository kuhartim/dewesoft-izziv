"use client";
import NewTask from "@/components/new-task";
import Task from "@/components/task";
import useTasks from "@/hooks/useTasks";
import { TaskStatus } from "@/types/task.types";
import { Box, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Page() {
  const { tasks, updateTask } = useTasks();

  const onImportantToggle = (id: string, important: boolean) => {
    updateTask(id, { important });
  };
  const onStatusChange = (id: string, status: TaskStatus) => {
    updateTask(id, { status });
  };

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
        <Input placeholder="Search tasks" />
      </Stack>
      {tasks.length === 0 && <Text color="gray.400">No tasks yet</Text>}
      <Stack width="100%">
        {tasks.map((task) => (
          <Task
            key={task.created}
            text={task.name}
            status={task.status}
            important={task.important}
            onImportantToggle={() =>
              onImportantToggle(task.created, !task.important)
            }
            onStatusChange={(newStatus) =>
              onStatusChange(task.created, newStatus)
            }
          />
        ))}
      </Stack>
    </Stack>
  );
}
