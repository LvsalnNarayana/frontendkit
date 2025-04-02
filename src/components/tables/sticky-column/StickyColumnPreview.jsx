import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { makeData } from "./makeData";
import { faker } from "@faker-js/faker";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
} from "@mui/material";

// Common pinning styles for sticky columns
const getCommonPinningStyles = (column) => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(), // Enforce defined width
    minWidth: column.getSize(), // Prevent shrinking
    maxWidth: column.getSize(), // Prevent growing
    zIndex: isPinned ? 1 : 0,
  };
};

const defaultColumns = [
  {
    accessorKey: "firstName",
    id: "firstName",
    header: "First Name",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    size: 300,
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: (props) => props.column.id,
    size: 600,
  },
  {
    accessorKey: "age",
    id: "age",
    header: "Age",
    footer: (props) => props.column.id,
    size: 600,
  },
  {
    accessorKey: "visits",
    id: "visits",
    header: "Visits",
    footer: (props) => props.column.id,
    size: 300,
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
    footer: (props) => props.column.id,
    size: 600,
  },
  {
    accessorKey: "progress",
    id: "progress",
    header: "Profile Progress",
    footer: (props) => props.column.id,
    size: 600,
  },
];

function StickyColumnPreview() {
  const [data, setData] = useState(() => makeData(30));
  const [columns] = useState(() => [...defaultColumns]);

  const rerender = () => setData(() => makeData(30));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  const randomizeColumns = () => {
    table.setColumnOrder(
      faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id))
    );
  };

  return (
    <Stack width="100%" height="100%" spacing={2}>
      {/* Column visibility controls */}
      <Stack
        direction="row"
        p={2}
        spacing={2}
        flexWrap="wrap"
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: 2 }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={table.getIsAllColumnsVisible()}
              onChange={table.getToggleAllColumnsVisibilityHandler()}
            />
          }
          label="Toggle All"
        />
        {table.getAllLeafColumns().map((column) => (
          <FormControlLabel
            key={column.id}
            control={
              <Checkbox
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
            }
            label={column.id}
          />
        ))}
      </Stack>
      {/* Action buttons */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="outlined"
          size="small"
          onClick={rerender}
          sx={{
            transition: "background-color 0.3s",
            "&:hover": { backgroundColor: "primary.main", color: "white" },
          }}
        >
          Regenerate
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={randomizeColumns}
          sx={{
            transition: "background-color 0.3s",
            "&:hover": { backgroundColor: "primary.main", color: "white" },
          }}
        >
          Shuffle Columns
        </Button>
      </Stack>
      {/* Table container */}
      <Box
        sx={{
          width: "100%", // Container width matches parent
          maxWidth: "100%", // Prevent exceeding parent width
          overflowX: "auto", // Horizontal scroll when table overflows
          maxHeight: "100%", // Vertical scroll for rows
          overflowY: "auto",
        }}
      >
        <table
          style={{
            width: table.getTotalSize(), // Total column width (3000px)
            minWidth: "100%", // Fill container if smaller
            tableLayout: "fixed", // Enforce column sizes
            border: "1px solid black", // Fixed typo 'bklack' to 'black'
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const { column } = header;
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        backgroundColor: "white",
                        ...getCommonPinningStyles(column),
                      }}
                    >
                      <div className="whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}{" "}
                        {column.getIndex(column.getIsPinned() || "center")}
                      </div>
                      {!header.isPlaceholder && header.column.getCanPin() && (
                        <Stack
                          direction="row"
                          spacing={0.5}
                          justifyContent="center"
                          mt={0.5}
                        >
                          {header.column.getIsPinned() !== "left" && (
                            <Button
                              size="small"
                              onClick={() => header.column.pin("left")}
                            >
                              {"<="}
                            </Button>
                          )}
                          {header.column.getIsPinned() && (
                            <Button
                              size="small"
                              onClick={() => header.column.pin(false)}
                            >
                              X
                            </Button>
                          )}
                          {header.column.getIsPinned() !== "right" && (
                            <Button
                              size="small"
                              onClick={() => header.column.pin("right")}
                            >
                              {"=>"}
                            </Button>
                          )}
                        </Stack>
                      )}
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`,
                        }}
                      />
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell;
                  return (
                    <td
                      key={cell.id}
                      style={{
                        backgroundColor: "white",
                        ...getCommonPinningStyles(column),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <pre>{JSON.stringify(table.getState().columnPinning, null, 2)}</pre>
    </Stack>
  );
}

export default StickyColumnPreview;
