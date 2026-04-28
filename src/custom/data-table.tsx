import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  type Row,
  useReactTable,
} from "@tanstack/react-table";

import { Loader2 } from "lucide-react";
import React from "react";

interface DataTableProps<TData> {
  data?: TData[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  isLoading?: boolean;
  getRowProps?: (row: Row<TData>) => React.HTMLAttributes<HTMLTableRowElement>;
}

export function DataTable<TData>({
  columns,
  data = [],
  getRowProps,
  isLoading,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="overflow-hidden font-poppins">
      <div className="relative w-full min-w-ma min-h-36 overflow-x-auto">
        {isLoading ? (
          <div className="border rounded-md overflow-hidden">
            <div className="bg-[#F5F7F9] w-full h-10 animate-pulse"></div>
            <div className="relative items-center bg-white divide-y">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-h-8 animate-pulse"></div>
              ))}
              <Loader2 className="top-1/2 left-1/2 absolute opacity-40 -translate-1/2 animate-spin" />
            </div>
          </div>
        ) : (
          <Table className="border rounded-md w-full min-w-max overflow-hidden text-left">
            <TableHeader className="bg-[#F5F7F9] font-semibold text-[#666363] text-[0.875rem] uppercase tracking-wider">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, rowIndex) => {
                  const rowProps = getRowProps?.(row) || {};

                  return (
                    <TableRow key={rowIndex} {...rowProps}>
                      {row.getVisibleCells().map((cell) => {
                        const context = { ...cell.getContext(), rowIndex };

                        return (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, context)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="py-4 text-gray-500 text-center"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
