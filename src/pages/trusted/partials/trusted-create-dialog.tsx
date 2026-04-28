import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  showApiErrorMessage,
  showSuccessMessage,
} from "@/context/lib/helpers/sonner";
import { Plus } from "lucide-react";
import TrustedForm from "./trusted-form";
import type { ITrustedData } from "../schema/trusted-schema";
import { useCreateTrusted } from "@/services/homes/trusted.api";
import { useState } from "react";

const TrustedCreateDialog = () => {
  const[open,setOpen]=useState(false);
  const { mutateAsync } = useCreateTrusted();
  const onSubmit = async (data: ITrustedData) => {
    try {
      const res = await mutateAsync(data);
      showSuccessMessage(res.data.message);
      setOpen(false)
    } catch (error) {
      showApiErrorMessage(error);
    }
  };

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-violet-600 text-white px-1 py-1 pr-3 mb-2 mt-2 rounded-lg   font-serif text-md shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2">
        <Plus size={15} />
        Add Trusted
      </DialogTrigger>
      <DialogContent>
        <TrustedForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default TrustedCreateDialog;
