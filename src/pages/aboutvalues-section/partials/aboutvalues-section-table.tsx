import { useNavigate } from "react-router";
import type { useValuesSection } from "../hooks/use-values-section";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/custom/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import type { IValueSection } from "@/types/about/values-section.interface";
import { ActionPopover } from "@/custom/customPopover/custom-popover";
import { ROUTES } from "@/routes/routes";

const columnHelper = createColumnHelper<IValueSection>();

export const ValuesSectionTable: React.FC<{
  data: ReturnType<typeof useValuesSection>;
}> = ({ data }) => {
  const { isLoading, remove, valueSectionData } = data;
  const navigate = useNavigate();

  const columns = [
    columnHelper.display({
      header: "S.N.",
      size: 10,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    }),

    columnHelper.accessor("icon", {
      header: "Icon",
      cell: ({ getValue }) => {
        const icon = getValue();
        return icon?.path ? (
          <img
            src={icon.path}
            alt="icon"
            className="h-10 w-10 rounded-md object-cover"
          />
        ) : (
          <span className="text-zinc-400 text-sm">No Icon</span>
        );
      },
    }),

    columnHelper.accessor("title", {
      header: "Title",
    }),

    columnHelper.accessor("description", {
      header: "Description",
      cell: ({ getValue }) => (
        <span className="text-sm text-zinc-500 line-clamp-2">{getValue()}</span>
      ),
    }),

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <ActionPopover
          onDelete={() => remove(row.original.id)}
          onEdit={() =>
            navigate(
              ROUTES.about.valuessection.edit.replace(":id", row.original.id),
            )
          }
        />
      ),
    }),
  ];

  return (
    <Card className="p-5">
      <DataTable
        isLoading={isLoading}
        data={valueSectionData?.data ?? []}
        columns={columns}
      />
    </Card>
  );
};
