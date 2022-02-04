/* eslint-disable react/jsx-key */
import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Tfoot,
  IconButton,
  Flex,
  Text,
  Stack,
  Select,
  Box,
} from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  useTable,
  useSortBy,
  Column,
  usePagination,
  useGlobalFilter,
  useFilters,
} from "react-table";

import { useRouter } from "next/router";
import GlobalFilter from "./GlobalFilter";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: Column<Data>[];
  gotoFirstLastPage?: boolean;
  tableNumber?: boolean;
  search?: boolean;
  onClick?: string;
  hiddenColumns?: string[] | any;
  rightButton?: JSX.Element;
};

function ChakraTable<Data extends object>({
  data,
  columns,
  gotoFirstLastPage = false,
  tableNumber = false,
  search = false,
  onClick,
  hiddenColumns = [],
  rightButton,
}: DataTableProps<Data>) {
  const {
    rows,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    setFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: hiddenColumns,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const router = useRouter();

  return (
    <Flex
      flexDirection={"column"}
      width={"full"}
      boxShadow="lg"
      rounded="lg"
      bgColor={"white"}
      py={2}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={4}
        my={2}
      >
        {search && (
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        )}
        {rightButton}
      </Flex>

      <Box overflow={"auto"}>
        <Table {...getTableProps()} size="md" bgColor="white">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()} bgColor="white">
                {tableNumber && <Th w="50px">No</Th>}
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                    fontFamily="inter"
                    fontWeight="extrabold"
                    py="6px"
                  >
                    {column.render("Header")}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <Tr
                  {...row.getRowProps()}
                  cursor={onClick ? "pointer" : "default"}
                  _hover={{ bgColor: "gray.50" }}
                  borderBottom="1.8px solid"
                  borderColor="gray.100"
                  onClick={
                    onClick &&
                    (() =>
                      router.push({
                        pathname: onClick,
                        query: { id: row.original.id },
                      }))
                  }
                >
                  {tableNumber && <Td>{row.index + 1}</Td>}
                  {row.cells.map((cell: any) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              );
            })}
            {page.length == 0 && (
              <Tr>
                <Td
                  colSpan={tableNumber ? columns.length + 1 : columns.length}
                  height="80px"
                >
                  <Text textAlign="center" fontWeight="semibold">
                    Data tidak ditemukan
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <Stack
        py="8px"
        px="14px"
        roundedBottom="lg"
        justifyContent="space-between"
        alignItems="center"
        direction={["column", "column", "row"]}
        bgColor="white"
      >
        <Stack direction="row" alignItems="center">
          <Text>Show:</Text>
          <Select
            value={pageSize}
            w="80px"
            size="sm"
            rounded="lg"
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
        </Stack>

        <Stack
          justifyContent="center"
          alignItems="center"
          direction={["column-reverse", "column-reverse", "row"]}
          spacing="8px"
        >
          <Stack direction="row" alignItems="center">
            <Text>Page:</Text>
            <Select
              value={pageIndex}
              w="80px"
              size="sm"
              rounded="lg"
              onChange={(e) => gotoPage(Number(e.target.value))}
            >
              {pageOptions.map((e: any) => (
                <option key={e} value={e}>
                  {e + 1}
                </option>
              ))}
            </Select>
          </Stack>

          <Stack direction="row" alignItems="center" spacing="4px">
            <Flex>
              <Text px="4px" fontWeight="medium">
                {pageIndex * pageSize + 1}-
                {!canNextPage ? data.length : pageSize * (pageIndex + 1)}
              </Text>
              <Text px="4px" fontWeight="medium" color="gray.500">
                of {data.length}
              </Text>
            </Flex>

            {gotoFirstLastPage && (
              <IconButton
                colorScheme="teal"
                aria-label="Search database"
                size="xs"
                icon={<ArrowLeftIcon fontSize="8px" />}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              />
            )}

            <IconButton
              colorScheme="green"
              aria-label="Search database"
              size="xs"
              icon={<ChevronLeftIcon />}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <IconButton
              colorScheme="green"
              aria-label="Search database"
              size="xs"
              icon={<ChevronRightIcon />}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
            {gotoFirstLastPage && (
              <IconButton
                colorScheme="teal"
                aria-label="Search database"
                size="xs"
                icon={<ArrowRightIcon fontSize="8px" />}
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ChakraTable;
