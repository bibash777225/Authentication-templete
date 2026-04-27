import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { type ReactNode } from "react";

const ConfirmationModal = ({
  children,
  onConfirm,
  title,
}: {
  children: ReactNode;
  onConfirm: () => void;
  title?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium text-text-dark text-lg">
            {title || "Are you sure you want to delete?"}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="hover:bg-primary border rounded-md hover:cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={onConfirm}
              className="bg-destructive hover:bg-secondary hover:cursor-pointer"
            >
              Yes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ConfirmationModal;
