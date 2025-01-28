"use client";
import NewTask from "@/components/new-task";
import Task, { TaskStatus } from "@/components/task";
import { Box, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Page() {
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [important, setImportant] = useState<boolean>(false);
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
      <Text color="gray.400">No tasks yet</Text>
      <Stack width="100%">
        <Task
          text="Car wash"
          status={status}
          important={important}
          onImportantToggle={() => setImportant((prev) => !prev)}
          onStatusChange={setStatus}
        />
      </Stack>
    </Stack>
  );
}
