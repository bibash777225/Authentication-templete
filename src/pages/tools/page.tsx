import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { imageUrl } from "@/context/lib/helpers/image";
import { DataTable } from "@/custom/data-table";
import { useGetAllTools } from "@/services/tools.api";
import type { ITool } from "@/types/tools.interface";
import { createColumnHelper } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import ToolsUpdateDialog from "./partials/tools-update-dialog";
import ToolsCreateDialog from "./partials/tools-create-dialog";
import ToolsDeleteDialog from "./partials/tools-delete-dialog";

const columnHelper = createColumnHelper<ITool>();
const ToolsPage = () => {
  const { data: toolsData } = useGetAllTools();
  const columns = [
    columnHelper.accessor("name", {}),
    columnHelper.accessor("image", {
      cell: ({ getValue }) => (
        <img
          crossOrigin="anonymous"
          src={imageUrl(getValue())}
          className="size-6"
        />
      ),
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
              <ToolsUpdateDialog id={row.original.id} />
              <ToolsDeleteDialog id={row.original.id} />
            </PopoverContent>
          </Popover>
        );
      },
    }),
  ];
  return (
    <div>
      <ToolsCreateDialog />
      <DataTable columns={columns} data={toolsData?.data.data || []} />
    </div>
  );
};

export default ToolsPage;
