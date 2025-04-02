import React, { useState } from "react";

import { faker } from "@faker-js/faker";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { makeData } from "./makeData";

const defaultColumns = [
  {
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
      {
        header: "More Info",
        columns: [
          {
            accessorKey: "visits",
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "status",
            header: "Status",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "progress",
            header: "Profile Progress",
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];

const ColumnPinningPreview = () => {
  const [data, setData] = useState(() => makeData(5000));
  const [columns] = useState(() => [...defaultColumns]);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState([]);
  const [columnPinning, setColumnPinning] = useState({});

  const [isSplit, setIsSplit] = useState(false);
  const rerender = () => setData(() => makeData(5000));

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnOrder,
      columnPinning,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
  });

  const randomizeColumns = () => {
    table.setColumnOrder(
      faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id))
    );
  };

  return (
    <Stack height="100%" spacing={2}>
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
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
            },
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
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
        >
          Shuffle Columns
        </Button>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSplit}
              onChange={(e) => setIsSplit(e.target.checked)}
            />
          }
          label="Split Mode"
        />
      </Stack>

      {/* Tables layout */}
      <Stack
        width={"100%"}
        direction="row"
        spacing={2}
        sx={{
          overflowY: "auto",
          flexGrow: 1,
          maxHeight: "100%",
        }}
      >
        {isSplit && (
          <Box variant="outlined" sx={{ width: "100%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                {table.getLeftHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ padding: 8, border: "1px solid #ccc" }}
                      >
                        {!header.isPlaceholder && (
                          <>
                            <div style={{ whiteSpace: "nowrap" }}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                            {header.column.getCanPin() && (
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
                          </>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, 20)
                  .map((row) => (
                    <tr key={row.id}>
                      {row.getLeftVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          style={{ padding: 8, border: "1px solid #ddd" }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </Box>
        )}

        {/* Center or full table */}
        <Box variant="outlined" sx={{ width: "100%" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              {(isSplit
                ? table.getCenterHeaderGroups()
                : table.getHeaderGroups()
              ).map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ padding: 8, border: "1px solid #ccc" }}
                    >
                      {!header.isPlaceholder && (
                        <>
                          <div style={{ whiteSpace: "nowrap" }}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          {header.column.getCanPin() && (
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
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, 20)
                .map((row) => (
                  <tr key={row.id}>
                    {(isSplit
                      ? row.getCenterVisibleCells()
                      : row.getVisibleCells()
                    ).map((cell) => (
                      <td
                        key={cell.id}
                        style={{ padding: 8, border: "1px solid #ddd" }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </Box>

        {/* Right pinned columns */}
        {isSplit && (
          <Box variant="outlined" sx={{ width: "100%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                {table.getRightHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ padding: 8, border: "1px solid #ccc" }}
                      >
                        {!header.isPlaceholder && (
                          <>
                            <div style={{ whiteSpace: "nowrap" }}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                            {header.column.getCanPin() && (
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
                          </>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, 20)
                  .map((row) => (
                    <tr key={row.id}>
                      {row.getRightVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          style={{ padding: 8, border: "1px solid #ddd" }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </Box>
        )}
      </Stack>

      {/* Debug state */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="caption" component="pre">
          {JSON.stringify(table.getState().columnPinning, null, 2)}
        </Typography>
      </Paper>
    </Stack>
  );
};

export default ColumnPinningPreview;
