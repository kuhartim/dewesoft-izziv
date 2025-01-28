import useStats from "@/hooks/useStats";
import { Box, SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

const StatsComponent = () => {
  const { totalTasks, tasksToDo, tasksDoing, tasksDone } = useStats();

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        {/* Total Tasks */}
        <Stat
          p={5}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.50"
        >
          <StatLabel fontSize="sm" color="gray.600">
            Total Tasks
          </StatLabel>
          <StatNumber fontSize="2xl" color="black">
            {totalTasks}
          </StatNumber>
        </Stat>

        {/* Tasks To Do */}
        <Stat
          p={5}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.50"
        >
          <StatLabel fontSize="sm" color="gray.600">
            Tasks To Do
          </StatLabel>
          <StatNumber fontSize="2xl" color="red.500">
            {tasksToDo}
          </StatNumber>
        </Stat>

        {/* Tasks In Progress */}
        <Stat
          p={5}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.50"
        >
          <StatLabel fontSize="sm" color="gray.600">
            In progress
          </StatLabel>
          <StatNumber fontSize="2xl" color="yellow.500">
            {tasksDoing}
          </StatNumber>
        </Stat>

        <Stat
          p={5}
          bg="white"
          borderRadius="md"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.50"
        >
          <StatLabel fontSize="sm" color="gray.600">
            Completed
          </StatLabel>
          <StatNumber fontSize="2xl" color="green.500">
            {tasksDone}
          </StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
};

export default StatsComponent;
