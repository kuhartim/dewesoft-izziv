import { Button, Icon, Text } from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";

const NewTask = () => {
  return (
    <>
      <Button
        leftIcon={<HiPlus size={16} />}
        colorScheme="gray"
        display="flex"
        alignItems="center"
      >
        <Text lineHeight={1} marginBottom={0.5}>
          New Task
        </Text>
      </Button>
    </>
  );
};

export default NewTask;
