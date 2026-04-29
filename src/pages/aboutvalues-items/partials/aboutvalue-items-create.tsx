
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  showApiErrorMessage,
  showSuccessMessage,
} from "@/context/lib/helpers/sonner";
import { Plus } from "lucide-react";
import { useCreateValeusItems } from "@/services/about/values.api";
import AboutValuesItemsForm from "./aboutvaluesitems-form";
import type { IValuesItemsData } from "../schema/aboutvaluesitems.schema";


const AboutValuesItemsCreateDialog = () => {
  const { mutateAsync } = useCreateValeusItems();
  const onSubmit = async (data: IValuesItemsData) => {
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
        Add Items
      </DialogTrigger>
      <DialogContent>
        <AboutValuesItemsForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AboutValuesItemsCreateDialog;
