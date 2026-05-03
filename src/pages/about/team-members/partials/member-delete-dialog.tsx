
import { showApiErrorMessage, showSuccessMessage } from "@/context/lib/helpers/sonner";
import ConfirmationModal from "@/custom/delete-modal";
import { useDeleteMembers } from "@/services/about/member.api";
import { Trash2Icon } from "lucide-react";

const MemberDeleteDialog = ({id}:{id:string}) => {
  const{mutateAsync}=useDeleteMembers();
  const onDelete= async ()=>{
    try {
      const res=await mutateAsync(id)
      showSuccessMessage(res.data.message)
    } catch (error) {
      showApiErrorMessage(error)
      
    }
  }
  return (
    <>
      <ConfirmationModal onConfirm={onDelete}>
        <button className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-red-50 text-red-600 transition">
          <Trash2Icon size={13} />
          Delete
        </button>
      </ConfirmationModal>
    </>
  ); 
};

export default MemberDeleteDialog;
