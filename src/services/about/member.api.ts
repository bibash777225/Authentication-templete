import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type {
    ITeamMemberDeleteResponseDTO,
  ITeamMemberPayLoadDTO,
  ITeamMemberPostResponseDTO,
  ITeamMemberResponseDTO,
  ITeamMemberUpdateResponseDTO,
} from "@/types/about/team-member.inerface";
import type { GenericPaginationParams } from "@/types/global.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//get Team member
export const useGetAllMembers = (parms?: GenericPaginationParams) => {
  return useQuery({
    queryKey: ["members", parms],
    queryFn: async () =>
      await HttpClient.get<ITeamMemberResponseDTO>(endpoints.TeamMembers.get),
  });
};
//post Team Member
export const useCreateMembers = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: async (data: ITeamMemberPayLoadDTO) =>
      await HttpClient.post<ITeamMemberPostResponseDTO>(
        endpoints.TeamMembers.post,
        data,
      ),
    onSuccess: () => {
      qq.invalidateQueries({
        queryKey: ["members"],
      });
    },
  });
};
//Update team members
export const useUpdateMemebers = () => {
  const qq = useQueryClient();
   return useMutation({
    mutationFn: async (data: {
      id: string | number;
      data: ITeamMemberPayLoadDTO;
    }) =>
      await HttpClient.patch<ITeamMemberUpdateResponseDTO>(
        endpoints.TeamMembers.patch(data.id),
        data.data,
      ),
      onSuccess:(_,variables)=>{
        qq.invalidateQueries({
            queryKey:["members",variables.id],
        })
      }
  });
};
// delete team members
export const useDeleteMembers = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) =>
      await HttpClient.delete<ITeamMemberDeleteResponseDTO>(
        endpoints.TeamMembers.delete(id),
      ),
    onSuccess: (_, id) => {
      qq.invalidateQueries({
        queryKey: ["members"],
      });
      qq.invalidateQueries({
        queryKey: ["members", id],
      });
    },
  });
};



