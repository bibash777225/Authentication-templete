import { Button } from "@/components/ui/button";
import {
  showApiErrorMessage,
  showSuccessMessage,
} from "@/context/lib/helpers/sonner";
import ConfirmationModal from "@/custom/delete-modal";
import { useDeleteTrusted } from "@/services/homes/trusted.api";
import { Trash2Icon } from "lucide-react";

const TrustedDeleteDialog = ({ id }: { id: string }) => {
  const { mutateAsync } = useDeleteTrusted();
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
      <Button variant="destructive">
        <Trash2Icon size={16} />
        Delete
      </Button>
    </ConfirmationModal>
  );
};

export default TrustedDeleteDialog;
