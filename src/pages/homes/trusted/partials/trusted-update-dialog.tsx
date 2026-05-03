import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import {
  showApiErrorMessage,
  showSuccessMessage,
} from "@/context/lib/helpers/sonner";
import { Edit, Loader2 } from "lucide-react";
import { useState } from "react";
import type { ITrustedData } from "../schema/trusted-schema";
import { useGetTrustedById, useUpdateTrusted } from "@/services/homes/trusted.api";
import TrustedForm from "./trusted-form";

const TrustedUpdateDialog: React.FC<{ id: string }> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetTrustedById(id);
  const defaultValues: ITrustedData = {
    name: data?.data.data.name || "",
    logoId: data?.data.data.logoId || "",
  };
  const { mutateAsync } = useUpdateTrusted();
  const onSubmit = async (data: ITrustedData) => {
    try {
      const res = await mutateAsync({ id, data });
      showSuccessMessage(res.data.message);
      setOpen(false);
    } catch (error) {
      showApiErrorMessage(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-violet-100 text-violet-500 transition">
          <Edit size={13} />
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-0 overflow-hidden rounded-xl">
        <div className="px-5 py-4 border-b">
          <DialogTitle className="text-base font-semibold text-gray-800">
            Edit Tools
          </DialogTitle>
          <p className="text-xs text-gray-400 mt-0.5">
            Update the fields below and save
          </p>
        </div>

        <div className="px-5 py-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-gray-400" />
            </div>
          ) : (
            <TrustedForm
              defaultValues={defaultValues}
              defaultImage={data?.data.data.logo}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrustedUpdateDialog;
