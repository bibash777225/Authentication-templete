import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCreateTool } from "@/services/tools.api";
import ToolsForm from "./tools-form";
import type { IToolData } from "../schema/tools-schema";
import {
  showApiErrorMessage,
  showSuccessMessage,
} from "@/context/lib/helpers/sonner";

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
      <DialogTrigger>Add</DialogTrigger>
      <DialogContent>
        <ToolsForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default ToolsCreateDialog;
