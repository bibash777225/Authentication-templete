import { Button } from "@/components/ui/button";
import {
  showApiErrorMessage,
  showSuccessMessage,
} from "@/context/lib/helpers/sonner";
import ConfirmationModal from "@/custom/delete-modal";
import { useDeleteTool } from "@/services/tools.api";

const ToolsDeleteDialog = ({ id }: { id: string }) => {
  const { mutateAsync } = useDeleteTool();
  const onDelete = async () => {
    try {
      const res = await mutateAsync(id);
      showSuccessMessage(res.data.message);
    } catch (error) {
      showApiErrorMessage(error);
    }
  };

  return (
    <ConfirmationModal onConfirm={onDelete}>
      <Button>Delete</Button>
    </ConfirmationModal>
  );
};

export default ToolsDeleteDialog;
