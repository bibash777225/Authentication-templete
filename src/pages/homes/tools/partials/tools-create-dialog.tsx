import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCreateTool } from "@/services/homes/tools.api";
import ToolsForm from "./tools-form";
import type { IToolData } from "../schema/tools-schema";
import {
  showApiErrorMessage,
  showSuccessMessage,
} from "@/context/lib/helpers/sonner";
import { Plus } from "lucide-react";

const ToolsCreateDialog = () => {
  const { mutateAsync } = useCreateTool();
  const onSubmit = async (data: IToolData) => {
    try {
      const res = await mutateAsync(data);
      showSuccessMessage(res.data.message);
    } catch (error) {
      showApiErrorMessage(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-violet-600 text-white px-1 py-1 pr-3 mb-2 mt-2 rounded-lg   font-serif text-md shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
        <Plus size={15} />
        Add Tool
      </DialogTrigger>
      <DialogContent>
        <ToolsForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default ToolsCreateDialog;
