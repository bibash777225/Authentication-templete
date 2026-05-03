import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ToolsForm from "./tools-form";
import type { IToolData } from "../schema/tools-schema";
import {
  showApiErrorMessage,
  showSuccessMessage,
} from "@/context/lib/helpers/sonner";
import { Edit, Loader2 } from "lucide-react";
import { useState } from "react";
import { useGetToolById, useUpdateTool } from "@/services/homes/tools.api";

const ToolsUpdateDialog: React.FC<{ id: string }> = ({ id }) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetToolById(id);

  const defaultValues: IToolData = {
    name: data?.data.data.name || "",
    imageId: data?.data.data.imageId || "",
  };

  const { mutateAsync } = useUpdateTool();

  const onSubmit = async (formData: IToolData) => {
    try {
      const res = await mutateAsync({ id, data: formData });
      showSuccessMessage(res.data.message);
      setOpen(false);
    } catch (error) {
      showApiErrorMessage(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-violet-100 text-gray-700 transition">
          <Edit size={13} />
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-sm p-0 overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
        <div className="px-6 py-4 border-b border-gray-100">
          <DialogTitle className="text-sm font-semibold text-gray-900">
            Edit Tool
          </DialogTitle>
          <p className="text-xs text-gray-400 mt-0.5">
            Update the fields below and save
          </p>
        </div>

        <div className="px-6 py-5">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-gray-300" />
            </div>
          ) : (
            <ToolsForm
              defaultValues={defaultValues}
              defaultImage={data?.data.data.image}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ToolsUpdateDialog;
