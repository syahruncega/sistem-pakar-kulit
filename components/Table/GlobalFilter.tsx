/* eslint-disable react/no-children-prop */
import { SearchNormalBulkIcon } from "@/styles/iconsax";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter: FC<{ filter: any; setFilter: any }> = ({
  filter,
  setFilter,
}) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 500);
  return (
    <InputGroup mx={4} my={3}>
      <InputLeftElement
        pointerEvents="none"
        children={
          <SearchNormalBulkIcon color="gray.500" boxSize="20px" mt={-2} />
        }
      />
      <Input
        maxWidth="400px"
        bgColor="white"
        type="text"
        size="sm"
        rounded="lg"
        placeholder="Cari..."
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </InputGroup>
  );
};

export default GlobalFilter;
