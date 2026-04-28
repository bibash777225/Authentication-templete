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
      <DialogTrigger className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2 shadow-md hover:shadow-lg">
        <Edit size={16} />
        Update
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">
          Update Tool
        </DialogTitle>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg">
            <TrustedForm
              defaultValues={defaultValues}
              defaultImage={data?.data.data.logo}
              onSubmit={onSubmit}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TrustedUpdateDialog;
