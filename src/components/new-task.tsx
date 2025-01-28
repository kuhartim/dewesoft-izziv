import {
  Button,
  Icon,
  Input,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
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

const NewTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" gap="6">
            <FormControl id="task" isRequired>
              <FormLabel>Task name</FormLabel>
              <Input placeholder="Wash a car" />
              <FormErrorMessage>Task name is required.</FormErrorMessage>
            </FormControl>
            <FormControl
              id="important"
              display="flex"
              alignItems="center"
              gap="2"
            >
              <Switch size="lg" />
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
              onClick={onClose}
              width="100%"
            >
              AddTask
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewTask;
