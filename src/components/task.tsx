import {
  Card,
  CardBody,
  Text,
  Button,
  Select,
  ButtonGroup,
} from "@chakra-ui/react";
import { HiOutlineStar } from "react-icons/hi";

export enum TaskStatus {
  TODO = "To-Do",
  DOING = "Doing",
  DONE = "Done",
}

interface TaskProps {
  important?: boolean;
  text: string;
  status: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
  onImportantToggle?: () => void;
}

const Task = ({
  important,
  text,
  status,
  onStatusChange,
  onImportantToggle,
}: TaskProps) => {
  const color = (() => {
    if (important) {
      if (status === TaskStatus.DONE) return "gray";

      return "yellow";
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
        >
          {text}
        </Text>
        <ButtonGroup isAttached size="xs" variant="ghost">
          <Button
            {...(important && status == TaskStatus.TODO
              ? { variant: "solid", bgColor: "yellow.200" }
              : status == TaskStatus.TODO
              ? { variant: "solid", bgColor: "red.200" }
              : {})}
            _hover={important ? { bg: "yellow.100" } : { bg: "green.100" }}
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
            _hover={important ? { bg: "yellow.100" } : { bg: "green.100" }}
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
            _hover={important ? { bg: "yellow.100" } : { bg: "green.100" }}
            onClick={() => onStatusChange(TaskStatus.DONE)}
            fontWeight={700}
            color="gray.700"
          >
            DONE
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
};

export default Task;
