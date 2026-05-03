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
import { Edit } from "lucide-react";
import { useState } from "react";
import type { IMemberData } from "../schema/member-schema";
import type { ITeamMember } from "@/types/about/team-member.inerface";
import { useUpdateMemebers } from "@/services/about/member.api";
import MemberForm from "./members-form";

type Props = {
  data: ITeamMember;
};
const MemberUpdateDialog = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const defaultValues: IMemberData = {
    name: data?.name || "",
    imageId: data?.imageId || "",
    position: data?.position || "",
  };
  const { mutateAsync } = useUpdateMemebers();
  const onSubmit = async (formData: IMemberData) => {
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
        <div className="px-5 py-4  p-0 border-b">
          <DialogTitle className="text-base font-semibold text-gray-800">
            Edit Members
          </DialogTitle>
          <p className="text-xs text-gray-400 mt-0.5">
            Update the fields below and save
          </p>
        </div>

        <div className="px-5 pt-2 pb-4">
          <MemberForm
            defaultValues={defaultValues}
            defaultImage={data?.image}
            onSubmit={onSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberUpdateDialog;
