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
import { UseUpdateValuesItems } from "@/services/about/values.api";
import { Edit, Loader2 } from "lucide-react";
import { useState } from "react";
import type { IValuesItemsData } from "../schema/aboutvaluesitems.schema";
import AboutValuesItemsForm from "./aboutvaluesitems-form";
import type { IValuesItems } from "@/types/about/values-items.interface";
type Props = {
  data: IValuesItems;
};
const AboutValuesItemsUpdateDialog = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const defaultValues: IValuesItemsData = {
    title: data.title,
    iconId: data.iconId,
    description: data.description,
  };

  const { mutateAsync, isPending } = UseUpdateValuesItems();

  const onSubmit = async (formData: IValuesItemsData) => {
    try {
      const res = await mutateAsync({
        id: data.id,
        data: formData,
      });

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
            Edit item
          </DialogTitle>
          <p className="text-xs text-gray-400 mt-0.5">
            Update the fields below and save
          </p>
        </div>

        <div className="px-5 py-4">
          {isPending? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-gray-400" />
            </div>
          ) : (
            <AboutValuesItemsForm
              defaultValues={defaultValues}
              defaultImage={data?.icon}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AboutValuesItemsUpdateDialog;
