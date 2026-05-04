
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { imageUrl } from "@/context/lib/helpers/image";
import { DataTable } from "@/custom/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import TrustedUpdateDialog from "./partials/trusted-update-dialog";
import TrustedDeleteDialog from "./partials/trusted-delete-dialog";
import TrustedCreateDialog from "./partials/trusted-create-dialog";
import { useGetAllTrusted } from "@/services/homes/trusted.api";
import type { ITrusted } from "@/types/homes/trusted.interface";


const columnHelper = createColumnHelper<ITrusted>();
const TrustedPage = () => {
  const { data: trustedData } = useGetAllTrusted();
  const columns = [
    
    columnHelper.accessor("name", {
      header:"NAME",
      cell:({getValue})=><span className="font-semibold">
        {getValue()}
      </span>
    }),
    columnHelper.accessor("logo", {
      cell: ({ getValue }) => (
        <img
          crossOrigin="anonymous"
          src={imageUrl(getValue())}
          className="size-6 "
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
              <TrustedUpdateDialog  id={row.original.id} />
              <TrustedDeleteDialog id={row.original.id} />
            </PopoverContent>
          </Popover>
        );
      },
    }),
  ];
  return (
    <div>
      <TrustedCreateDialog />
      <DataTable columns={columns} data={trustedData?.data.data || []} />
    </div>
  );
};

export default TrustedPage;
