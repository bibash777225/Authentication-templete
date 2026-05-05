
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { imageUrl } from "@/context/lib/helpers/image";
import { DataTable } from "@/custom/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import BlogEditPageDialog from "./partials/blog-edit";
import BlogDeleteDialog from "./partials/blog-delete";
import BlogCreateDialog from "./partials/blog-create";
import type { IBlog } from "@/types/blog/blog-interface";
import { useGetAllBlogApi } from "@/services/blog/blog.api";

const columnHelper = createColumnHelper<IBlog>();
const BlogPage = () => {
  const { data: BlogsData } = useGetAllBlogApi();
  const items = BlogsData?.data?.data || [];
  console.log("API DATA:", BlogsData);
  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: ({ getValue }) => <span className="font-semibold">{getValue()}</span>,
    }),
    columnHelper.accessor("shortDescription", {}),
    columnHelper.accessor("content", {}),
    columnHelper.accessor("slug", {}),

    columnHelper.accessor("featuredImage", {
      cell: ({ getValue }) => {
        const icon = getValue();
        if (icon) {
          return (
            <img
              crossOrigin="anonymous"
              src={imageUrl(icon)}
              className="size-6"
            />
          );
        } else {
          return "not found";
        }
      },
    }),
    columnHelper.display({
      header: "Actions",
      cell: ({ row }) => {
        return (
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical />
            </PopoverTrigger>
            <PopoverContent>
              <BlogEditPageDialog data={row.original} />
              <BlogDeleteDialog id={row.original.id} />
            </PopoverContent>
          </Popover>
        );
      },
    }),
  ];
  return (
    <div>
      <BlogCreateDialog />
      <DataTable columns={columns} data={items} />
    </div>
  );
};

export default BlogPage;

