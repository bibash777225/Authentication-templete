import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { imageUrl } from "@/context/lib/helpers/image";
import { DataTable } from "@/custom/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import MemberUpdateDialog from "./partials/member-update-dialog";
import MemberDeleteDialog from "./partials/member-delete-dialog";
import MemberCreateDialog from "./partials/member-create-dialog";
import { useGetAllMembers } from "@/services/about/member.api";
import type { ITeamMember } from "@/types/about/team-member.inerface";

const columnHelper = createColumnHelper<ITeamMember>();
const MemberPage = () => {
  const { data: TeamMemberData } = useGetAllMembers();
  const items = TeamMemberData?.data?.data || [];
  console.log("API DATA:", TeamMemberData);
  const columns = [
    columnHelper.accessor("name", {}),
    columnHelper.accessor("position", {}),

    columnHelper.accessor("image", {
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
              <MemberUpdateDialog data={row.original} />
              <MemberDeleteDialog id={row.original.id} />
            </PopoverContent>
          </Popover>
        );
      },
    }),
  ];
  return (
    <div>
      <MemberCreateDialog />
      <DataTable columns={columns} data={items} />
    </div>
  );
};

export default MemberPage;
