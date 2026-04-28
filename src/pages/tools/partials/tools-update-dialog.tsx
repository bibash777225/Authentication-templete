import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetToolById, useUpdateTool } from "@/services/tools.api";
import ToolsForm from "./tools-form";
import type { IToolData } from "../schema/tools-schema";
import {
  showApiErrorMessage,
  showSuccessMessage,
} from "@/context/lib/helpers/sonner";
import { Loader2 } from "lucide-react";

const ToolsUpdateDialog: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useGetToolById(id);
  const defaultValues: IToolData = {
    name: data?.data.data.name || "",
    imageId: data?.data.data.imageId || "",
  };
  const { mutateAsync } = useUpdateTool();
  const onSubmit = async (data: IToolData) => {
    try {
      const res = await mutateAsync({ id, data });
      showSuccessMessage(res.data.message);
    } catch (error) {
      showApiErrorMessage(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Update </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update</DialogTitle>
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <ToolsForm
            defaultValues={defaultValues}
            defaultImage={data?.data.data.image}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ToolsUpdateDialog;
