import { TaskStatus } from "@/types/task.types";
import {
  Card,
  CardBody,
  Text,
  Button,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineStar, HiOutlineTrash } from "react-icons/hi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface TaskProps {
  important?: boolean;
  text: string;
  status: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
  onImportantToggle?: () => void;
  onDelete: () => void;
}

const Task = ({
  important,
  text,
  status,
  onStatusChange,
  onImportantToggle,
  onDelete,
}: TaskProps) => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const onTaskDelete = () => {
    onDeleteModalClose();
    onDelete();
  };

  const color = (() => {
    if (important) {
      switch (status) {
        case TaskStatus.TODO:
          return "orange";
        case TaskStatus.DOING:
          return "yellow";
        case TaskStatus.DONE:
          return "gray";
      }
    }

    switch (status) {
      case TaskStatus.TODO:
        return "red";
      case TaskStatus.DOING:
        return "green";
      case TaskStatus.DONE:
        return "gray";
    }
  })();

  return (
    <Card
      width="100%"
      backgroundColor={`${color}.50`}
      border="1px"
      borderColor={`${color}.100`}
    >
      <CardBody display="flex" alignItems="center" gap="2">
        <Button
          size="sm"
          variant="ghost"
          aspectRatio={1}
          _hover={{ bg: `${color}.100` }}
          p="0"
          color={important ? "yellow.500" : "gray.500"}
          onClick={onImportantToggle}
        >
          <HiOutlineStar size={16} />
        </Button>
        <Text
          fontWeight={600}
          marginBottom={0.5}
          flexGrow={1}
          textDecoration={status === TaskStatus.DONE ? "line-through" : "none"}
          px="10px"
        >
          {text}
        </Text>
        <ButtonGroup isAttached size="xs" variant="ghost">
          <Button
            {...(important && status == TaskStatus.TODO
              ? { variant: "solid", bgColor: "orange.200" }
              : status == TaskStatus.TODO
              ? { variant: "solid", bgColor: "red.200" }
              : {})}
            _hover={{ bg: `${color}.100` }}
            onClick={() => onStatusChange(TaskStatus.TODO)}
            fontWeight={700}
            color="gray.700"
          >
            TO DO
          </Button>
          <Button
            {...(important && status == TaskStatus.DOING
              ? { variant: "solid", bgColor: "yellow.200" }
              : status == TaskStatus.DOING
              ? { variant: "solid", bgColor: "green.200" }
              : {})}
            _hover={{ bg: `${color}.100` }}
            onClick={() => onStatusChange(TaskStatus.DOING)}
            fontWeight={700}
            color="gray.700"
          >
            DOING
          </Button>
          <Button
            {...(status == TaskStatus.DONE
              ? { variant: "solid", bgColor: "gray.200" }
              : {})}
            _hover={{ bg: `${color}.100` }}
            onClick={() => onStatusChange(TaskStatus.DONE)}
            fontWeight={700}
            color="gray.700"
          >
            DONE
          </Button>
        </ButtonGroup>
        <>
          <Button
            size="sm"
            variant="ghost"
            aspectRatio={1}
            _hover={{ bg: `red.100` }}
            p="0"
            color="red.500"
            onClick={onDeleteModalOpen}
          >
            <HiOutlineTrash size={20} />
          </Button>
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={onDeleteModalClose}
            isCentered
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete existing task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Are you sure you want to delete task &quot;{text}&quot;
                </Text>
              </ModalBody>
              <ModalFooter marginTop="4">
                <ButtonGroup>
                  <Button colorScheme="gray" onClick={onDeleteModalClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={onTaskDelete}>
                    Delete
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </CardBody>
    </Card>
  );
};

export default Task;
