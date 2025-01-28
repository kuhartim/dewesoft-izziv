import { Button, Input, Switch, Text, useDisclosure } from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import useTasks from "@/hooks/useTasks";
import { useEffect, useRef, useState } from "react";

const NewTask = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addTask } = useTasks();

  const [taskName, setTaskName] = useState<string>("");
  const [important, setImportant] = useState<boolean>(false);

  const [isTaskError, setIsTaskError] = useState<boolean>(false);

  const onTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTaskError(false);
    setTaskName(e.target.value);
  };
  const onImportantToggle = () => setImportant((prev) => !prev);

  const onAdd = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!taskName) {
      setIsTaskError(true);
      return;
    }

    setIsTaskError(false);

    addTask({
      name: taskName,
      important: important,
    });
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setTaskName("");
      setImportant(false);
    } else {
      setTimeout(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  return (
    <>
      <Button
        leftIcon={<HiPlus size={16} />}
        colorScheme="gray"
        display="flex"
        alignItems="center"
        onClick={onOpen}
      >
        <Text lineHeight={1} marginBottom={0.5}>
          New Task
        </Text>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onAdd} noValidate>
            <ModalHeader>Add new task</ModalHeader>
            <ModalCloseButton type="button" />
            <ModalBody display="flex" flexDirection="column" gap="6">
              <FormControl id="task" isRequired isInvalid={isTaskError}>
                <FormLabel>Task name</FormLabel>
                <Input
                  value={taskName}
                  onChange={onTaskNameChange}
                  placeholder="Wash a car"
                  ref={inputRef}
                />
                <FormErrorMessage>Task name is required.</FormErrorMessage>
              </FormControl>
              <FormControl
                id="important"
                display="flex"
                alignItems="center"
                gap="2"
              >
                <Switch
                  isChecked={important}
                  onChange={onImportantToggle}
                  size="lg"
                />
                <FormLabel margin={0} marginBottom={0.5}>
                  Mark as important
                </FormLabel>
              </FormControl>
            </ModalBody>

            <ModalFooter marginTop="4">
              <Button
                bg="black"
                color="white"
                _hover={{ bg: "gray.700" }}
                width="100%"
                type="submit"
              >
                AddTask
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewTask;
