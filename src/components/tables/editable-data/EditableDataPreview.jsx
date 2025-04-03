import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { makeData } from "./makeData";
import { Stack, Typography } from "@mui/material";
import CustomTextInput from "../../shared/inputs/CustomTextInput";

const EditableCell = ({ getValue, row: { index }, column: { id }, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      style={{
        border: "none",
        background: "transparent",
        padding: "8px",
        margin: "0",
        width: "100%",
        height: "100%",
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="border p-1 rounded w-full"
    />
  );
};

const defaultColumn = {
  cell: EditableCell,
};

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip];
}

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div style={{ display: "flex", gap: "8px", marginTop: 8 }}>
      <CustomTextInput
        name={`${column.id}-min`}
        value={columnFilterValue?.[0] ?? ""}
        onChange={(_, val) =>
          column.setFilterValue((old = []) => [val, old[1]])
        }
        placeholder="Min"
        fullWidth
        inputPadding="0px"
        rootPadding={0.5}
      />
      <CustomTextInput
        name={`${column.id}-max`}
        value={columnFilterValue?.[1] ?? ""}
        onChange={(_, val) =>
          column.setFilterValue((old = []) => [old[0], val])
        }
        placeholder="Max"
        inputPadding="0px"
        rootPadding={0.5}
        fullWidth
      />
    </div>
  ) : (
    <div style={{ marginTop: 8 }}>
      <CustomTextInput
        name={column.id}
        value={columnFilterValue ?? ""}
        onChange={(_, val) => column.setFilterValue(val)}
        placeholder="Search..."
        fullWidth
        inputPadding="0px"
        rootPadding={0.5}
      />
    </div>
  );
}

function EditableDataPreview() {
  const columns = useMemo(
    () => [
      {
        header: "Name",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "firstName",
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.lastName,
            id: "lastName",
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
    ],
    []
  );
  const [data, setData] = useState(() => makeData(1000));
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  return (
    <Stack width={"100%"} height={"100%"}>
      <Stack
        width={"100%"}
        sx={{
          overflow: "auto",
          height: "100%",
          maxHeight: "calc(100vh - 200px)",
        }}
      >
        <table
          style={{
            border: "1px solid black",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-b p-2"
                  >
                    {header.isPlaceholder ? null : (
                      <Stack>
                        <Typography
                          variant="body1"
                          fontSize={14}
                          textTransform={"capitalize"}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Typography>
                        {header.column.getCanFilter() && (
                          <Filter column={header.column} table={table} />
                        )}
                      </Stack>
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
                      padding: 0,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Stack>

      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>

        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>

        <span>
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Stack>
  );
}

export default EditableDataPreview;
