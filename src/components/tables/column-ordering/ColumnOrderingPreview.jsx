import {
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
const sampleData = [
  {
    name: "John Doe",
    age: 30,
    city: "New York",
  },
  {
    name: "Jane Doe",
    age: 25,
    city: "Los Angeles",
  },
  {
    name: "Bob Smith",
    age: 40,
    city: "Chicago",
  },
  {
    name: "Alice Johnson",
    age: 35,
    city: "Houston",
  },
  {
    name: "Charlie Brown",
    age: 28,
    city: "Phoenix",
  },
  {
    name: "Diana Prince",
    age: 32,
    city: "Philadelphia",
  },
  {
    name: "Eva Green",
    age: 29,
    city: "San Antonio",
  },
  {
    name: "Frank Miller",
    age: 45,
    city: "San Diego",
  },
  {
    name: "Grace Lee",
    age: 38,
    city: "Dallas",
  },
  {
    name: "Henry Davis",
    age: 27,
    city: "San Jose",
  },
];
const ColumnOrderingPreview = () => {
  const columnHelper = createColumnHelper();
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrder, setColumnOrder] = useState(["name", "age", "city"]);
  const columns = [
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.age, {
      id: "age",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Age</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("city", {
      header: () => "City",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data: sampleData || [],
    columns,
    state: {
      columnVisibility,
      columnOrder,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  });
  const randomizeColumns = () => {
    const currentOrder = [...table.getState().columnOrder]; // Get current order safely

    // Fisher–Yates Shuffle (stable)
    for (let i = currentOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentOrder[i], currentOrder[j]] = [currentOrder[j], currentOrder[i]];
    }

    table.setColumnOrder(currentOrder);
  };

  // Handle visibility toggle from Select component
  const handleVisibilityChange = (event) => {
    const {
      target: { value },
    } = event;

    const selected = typeof value === "string" ? value.split(",") : value;

    const newVisibility = {};
    table.getAllColumns().forEach((col) => {
      newVisibility[col.id] = selected.includes(col.id);
    });
    setColumnVisibility(newVisibility);
  };
  const allColumns = table.getAllLeafColumns().map((col) => col.id);
  const visibleColumns = table.getVisibleLeafColumns().map((col) => col.id);

  return (
    <Stack height={"100%"} flexGrow={1} flexShrink={0} gap={4}>
      <Stack
        mt={3}
        mx={"auto"}
        width={"60%"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
      >
        <Typography
          variant="h3"
          fontWeight={500}
          flexShrink={0}
          fontSize={20}
          textAlign={"center"}
        >
          Column Ordering
        </Typography>
        <Stack direction={"row"} justifyContent={"center"} gap={2}>
          <Button size="small" onClick={randomizeColumns}>
            Shuffle Columns
          </Button>
          <Select
            size="small"
            multiple
            label="Columns"
            value={visibleColumns}
            onChange={handleVisibilityChange}
            // input={<OutlinedInput label="Columns" />}
            renderValue={(selected) => selected.join(", ")}
            sx={{ minWidth: 200 }}
          >
            {allColumns.map((colId) => (
              <MenuItem key={colId} value={colId}>
                <Checkbox checked={visibleColumns.includes(colId)} />
                <ListItemText primary={colId} />
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>
      <table
        border={"1px solid black"}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "60%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </Stack>
  );
};

export default ColumnOrderingPreview;
