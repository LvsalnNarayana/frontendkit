import { Stack, Typography } from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
const sampleData = [
  {
    name: "John Doe",
    age: 30,
    city: "New York",
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
const HeaderGroupingPreview = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.group({
      id: "metadata",
      header: () => "Metadata",
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor("name", {
          header: () => "Name",
          cell: (info) => info.renderValue(),
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("age", {
          header: () => "Age",
          cell: (info) => info.renderValue(),
          footer: (info) => info.column.id,
        }),
      ],
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
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Stack
      height={"100%"}
      flexGrow={1}
      flexShrink={0}
      gap={4}
      sx={{
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h3"
        sx={{ mt: 3 }}
        fontWeight={500}
        flexShrink={0}
        fontSize={20}
        textAlign={"center"}
      >
        Header Grouping
      </Typography>
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
                  colSpan={header.colSpan}
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
                  colSpan={header.colSpan}
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

export default HeaderGroupingPreview;
