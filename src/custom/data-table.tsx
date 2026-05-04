import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PaginatedResponseMeta } from "@/types/global.interface";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type Updater,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import React from "react";
import { CustomPagination } from "./customPopover/custom-pagination";


function getPaginationInfo(
  meta: PaginatedResponseMeta | undefined,
  data: unknown[] | undefined,
) {
  if (!meta) return;
  let page: number,
    take = 10;

  if (meta?.prev === null && meta.next === null) page = 1;
  else if (meta?.prev === null) page = 1;
  else if (meta?.next === null) page = meta?.totalPages || 1;
  else page = (meta?.prev ?? 0) + 1;
  //take
  if (meta.next) {
    take = data?.length || 10;
  } else {
    take =
      data?.length && meta.totalPages && meta.totalPages > 1
        ? Math.round((meta.length - data.length) / (meta.totalPages - 1)) || 10
        : 10;
  }

  return {
    page,
    take,
    pageCount: meta?.totalPages || meta?.next || 1,
    length: meta?.length || data?.length || 0,
  };
}

interface DataTableProps<TData> {
  data: TData[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  title?: string;
  isLoading?: boolean;
  meta?: PaginatedResponseMeta;
  onPaginationChange?: (pagination: { page: number; take: number }) => void;
  getRowProps?: (row: Row<TData>) => React.HTMLAttributes<HTMLTableRowElement>;
}

export function DataTable<TData>({
  columns,
  data = [],
  meta,
  onPaginationChange,
  getRowProps,
  isLoading,
}: DataTableProps<TData>) {
  const pagination = getPaginationInfo(meta, data);

  const onPagination: OnChangeFn<PaginationState> = React.useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      if (!pagination) return;
      let page, take;
      if (typeof updaterOrValue === "function") {
        const newPagination = updaterOrValue({
          pageIndex: pagination.page - 1, // normalize to 0-based
          pageSize: pagination.take,
        });
        page = newPagination.pageIndex + 1;
        take = newPagination.pageSize;
      } else {
        page = updaterOrValue.pageIndex + 1;
        take = updaterOrValue.pageSize;
      }
      console.table({ page, take, pagination });
      console.log(typeof updaterOrValue);
      if (onPaginationChange)
        onPaginationChange?.({
          page,
          take,
        });
    },
    [pagination, onPaginationChange],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualPagination: true,
    pageCount: pagination?.pageCount ?? -1,
    rowCount: pagination?.length,
    state: {
      pagination: pagination
        ? { pageIndex: pagination.page - 1, pageSize: pagination.take }
        : undefined,
    },
    onPaginationChange: onPagination,
  });

  return (
    <div className={`overflow-hidden  font-poppins`}>
      <div className="relative w-full min-w-ma min-h-36 overflow-x-auto">
        {isLoading ? (
          <div className="border rounded-md overflow-hidden">
            <div className="bg-[#F5F7F9] w-full h-10 animate-pulse"></div>
            <div className="relative items-center bg-white divide-y">
              {Array.from({ length: 4 }).map(() => (
                <div className="border-black/4 min-h-8 animate-pulse"></div>
              ))}
              <Loader2 className="top-1/2 left-1/2 z-10 absolute opacity-40 -translate-1/2 animate-spin" />
            </div>
          </div>
        ) : (
          <Table className="border rounded-md w-full min-w-max overflow-hidden text-left">
            <TableHeader className="bg-[#F5F7F9] font-semibold text-[#666363] text-[0.875rem] uppercase tracking-wider">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      // className="px-4 py-3 whitespace-nowrap"
                    >
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
                          <TableCell
                            key={cell.id}
                            // className="px-4 py-3 text-sm whitespace-nowrap"
                          >
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

      {pagination && <CustomPagination key={pagination.length} table={table} />}
    </div>
  );
}
