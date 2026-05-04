import PageHeader from "@/components/common-header/header";
import { DataTable } from "@/custom/data-table";
import { useQueryParamsState } from "@/hooks/useQueryParamState";
import { useGetAllContact } from "@/services/contact/contact.api";
import type { IContact } from "@/types/contact/contact-interface";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IContact>();
const ContactPage = () => {
  const [params, setParams] = useQueryParamsState({
    page: 1,
    take: 10,
    searchTerm: "",
  });
  const { data, isLoading } = useGetAllContact(params);
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

    columnHelper.accessor("fullName", {
      header: "Full name",
      cell: ({ getValue }) => {
        const name = getValue();
        return (
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center bg-blue-200 rounded-full w-8 h-8 font-semibold text-sm">
              {name?.[0]}
            </div>
            <div className="hover:underline underline-offset-2">{name}</div>
          </div>
        );
      },
    }),

    columnHelper.accessor("fullName", {
      header: "Name",
    }),

    columnHelper.accessor("phone", {
      header: "Contact no.",
    }),

    columnHelper.accessor("workEmail", {
      header: "Email",
    }),

    columnHelper.accessor("description", {
      header: "Description",
    }),
    columnHelper.accessor("budget", {
      header: "Budget",
    }),
    columnHelper.accessor("createdAt", {
      header: "Created at",
      cell: (info) => new Date(info.getValue()).toDateString(),
    }),
  ];
  return (
    <>
      <div className="mx-auto">
        <PageHeader title="Contact Us">
          <PageHeader.Title />
          <PageHeader.Search
            placeholder="Search Customer..."
            // value={params.searchTerm||""}
            onChange={(val) =>
              setParams({ ...params, searchTerm: val, page: 1 })
            }
          />
        </PageHeader>

        <DataTable
          data={data?.data.data || []}
          columns={columns}
          isLoading={isLoading}
          onPaginationChange={setParams}
        />
      </div>
    </>
  );
};
export default ContactPage; 
