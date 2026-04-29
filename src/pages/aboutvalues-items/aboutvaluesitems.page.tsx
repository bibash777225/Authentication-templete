import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { imageUrl } from "@/context/lib/helpers/image";
import { DataTable } from "@/custom/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import AboutValuesItemsUpdateDialog from "./partials/aboutvalues-update";
import AboutValuesItemsDeleteDialog from "./partials/aboutvalue-delete";
import AboutValuesItemsCreateDialog from "./partials/aboutvalue-items-create";
import { UseGetAllValuesItemsApi } from "@/services/about/values.api";
import type { IValuesItems } from "@/types/about/values-items.interface";

const columnHelper = createColumnHelper<IValuesItems>();
const ValuesItemsPage = () => {
  const { data: valueItemData } = UseGetAllValuesItemsApi();
  const items = valueItemData?.data?.data || [];
  console.log("API DATA:", valueItemData);
  const columns = [
    columnHelper.accessor("title", {}),
    columnHelper.accessor("description", {}),

    columnHelper.accessor("icon", {
      cell: ({ getValue }) => {
        const icon = getValue();
        if (icon){

            return (
              <img
                crossOrigin="anonymous"
                src={imageUrl(icon)}
                className="size-6"
              />
            );
        }else{
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
              <AboutValuesItemsUpdateDialog data={row.original} />
              <AboutValuesItemsDeleteDialog id={row.original.id} />
            </PopoverContent>
          </Popover>
        );
      },
    }),
  ];
  return (
    <div>
      <AboutValuesItemsCreateDialog />
      <DataTable columns={columns} data={items} />
    </div>
  );
};

export default ValuesItemsPage;
