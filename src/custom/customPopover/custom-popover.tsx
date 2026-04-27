import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { ROUTES } from "@/routes/routes";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
// import { Link } from "react-router";
import { useState } from "react";
import ConfirmationModal from "../delete-modal";


interface ActionItemProps {
  onEdit?: () => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  onView?: () => void | Promise<void>;
}

export const ActionPopover: React.FC<ActionItemProps> = ({
  onEdit,
  onDelete,
  onView,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = async () => {
    await onEdit?.();
    setIsOpen(false);
  };

  const handleDelete = async () => {
    await onDelete?.();
    setIsOpen(false);
  };

  const handleView = async () => {
    await onView?.();
    setIsOpen(false);
  };
  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="z-20 space-y-3 bg-white shadow p-3 border rounded-lg w-max"
        >
          {onView && (
            <Button
              onClick={handleView}
              variant={"ghost"}
              className="flex justify-start items-center gap-2 hover:bg-accent/10 rounded-xs w-full font-medium hover:text-primary"
            >
              <Eye size={14} /> View Detail
            </Button>
          )}
          {onEdit && (
            <Button
              onClick={handleEdit}
              variant="ghost"
              className="flex justify-start gap-2 hover:bg-accent/10 rounded-xs w-full font-medium hover:text-primary"
            >
              <Pencil size={14} /> Edit Detail
            </Button>
          )}
          {onDelete && (
            <ConfirmationModal onConfirm={handleDelete}>
              <Button
                variant={"ghost"}
                className="flex justify-start items-center w-full font-medium text-red-600 hover:text-primary"
              >
                <Trash2 size={14} className="text-red-600" /> Move to Trash
              </Button>
            </ConfirmationModal>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};
