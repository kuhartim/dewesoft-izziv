import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { HiX } from "react-icons/hi";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) => {
  const handleClear = () => {
    onChange(""); // Clear the input value
  };

  return (
    <InputGroup>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        pr="4.5rem" // Add padding to avoid overlapping with the clear button
      />
      {value && ( // Show clear button only when input is not empty
        <InputRightElement>
          <IconButton
            aria-label="Clear search"
            icon={<HiX />}
            size="sm"
            variant="ghost"
            onClick={handleClear}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchInput;
