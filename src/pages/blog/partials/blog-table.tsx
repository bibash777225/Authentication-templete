import { Card } from "@/components/ui/card";

import { DataTable } from "@/custom/data-table";

import { ROUTES } from "@/routes/routes";
;

import { createColumnHelper } from "@tanstack/react-table";

import { ActionPopover } from "@/custom/customPopover/custom-popover";
import { useNavigate } from "react-router";
import type { IBlog } from "@/types/blog/blog-interface";
import type { useBlog } from "../hooks/use-blog";

const columnHelper = createColumnHelper<IBlog>();

const BlogTable: React.FC<{ data: ReturnType<typeof useBlog> }> = ({
  data,
}) => {
  const { isLoading, remove, setPagination, blogData } = data;
  const navigate = useNavigate();
  const columns = [
    columnHelper.display({
      header: "S.N.",
      size: 10,
      cell: ({ table, row }) => (
        <div>
          {(table.getState().pagination?.pageIndex ?? 0) *
            (table.getState().pagination?.pageSize ?? 0) +
            row.index +
            1}
        </div>
      ),
    }),

    columnHelper.accessor("title", {
      header: "Title",
    }),

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <ActionPopover
          onDelete={() => {
            remove(row.original.id);
          }}
          onEdit={() =>
            navigate(ROUTES.blog.editBlog.replace(":id", row.original.id))
          }
        />
      ),
    }),
  ];

  return (
    <div>
      <Card key={blogData?.meta.prev} className="p-5">
        <DataTable
          isLoading={isLoading}
          data={blogData?.data || []}
          columns={columns}
          meta={blogData?.meta}
          onPaginationChange={setPagination}
        />
      </Card>
    </div>
  );
};

export default BlogTable;
