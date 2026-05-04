
import SelectDropdown from "@/components/form/select-dropdown";
import { Button } from "@/components/ui/button";
import { type Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CustomPagination = <TData,>({
  table,
}: {
  table: Table<TData>;
}) => {
  const pagination = table.getState().pagination;
  const pageCount = table.getPageCount();
  const allDataCount = table.getRowCount();

  console.log(pagination);

  const pageSizeOptions = [10, 20, 50].filter((opt) => opt <= allDataCount);
  return (
    <div className="flex justify-between items-center p-3.5 w-full font-['Montserrat'] text-sm">
      {/* Showing text */}
      <div className="flex items-center gap-2.5 text-zinc-500">
        <span>Showing:</span>
        <span className="text-black">
          <strong>{pagination.pageIndex + 1}</strong> of {pageCount}
        </span>
      </div>

      {/* Lines per page */}
      <div className="flex items-center gap-2.5">
        {pageSizeOptions.length ? (
          <div className="flex items-center gap-1">
            <span className="text-zinc-500">Lines per page:</span>
            <SelectDropdown
              value={pagination?.pageSize.toString()}
              options={pageSizeOptions.map((size) => ({
                label: size.toString(),
                value: size.toString(),
              }))}
              position="item-aligned"
              onChange={(v) => table.setPageSize(Number(v))}
              className="bg-slate-50 px-2.5 py-1.25 rounded-md outline-1 outline-slate-200 text-black text-xs"
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-2.5">
        <Button
          variant={"ghost"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="w-4 h-4 text-zinc-500" />
        </Button>

        {Array.from({ length: pageCount }).map((_, i) => {
          if (
            i === 0 ||
            i === pageCount - 1 ||
            Math.abs(i - pagination.pageIndex) <= 2
          ) {
            return (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`px-2.5 py-1.25 text-xs ${
                  i === pagination.pageIndex
                    ? " bg-slate-50 rounded-md  outline-1 -outline-offset-1 outline-slate-200"
                    : "text-zinc-500"
                }`}
              >
                {i + 1}
              </button>
            );
          } else if (
            i === pagination.pageIndex - 3 ||
            i === pagination.pageIndex + 3
          ) {
            return (
              <span
                key={i}
                className="px-1 py-1.25 text-zinc-500 text-xs tracking-widest"
              >
                ...
              </span>
            );
          }
          return null;
        })}

        <Button
          variant={"ghost"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </Button>
      </div>
    </div>
  );
};
