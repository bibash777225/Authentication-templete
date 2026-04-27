import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import {
  type IValueSectionUpdateResponseDTO,
  type IValueSectionCreateDTO,
  type IValueSectionUpdateDTO,
  type IValuessecCreateResponseDTO,
  type IValuessecResponseDTO,
} from "@/types/about/values-section.interface";
import type { GenericPaginationParams } from "@/types/global.interface";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//get values-section
export const UseGetAllValuesSecApi = (params?:GenericPaginationParams) =>
  useQuery({
    queryKey: ["valuesection",params],
    queryFn: async () =>
      await HttpClient.get<IValuessecResponseDTO>(endpoints.aboutValues.get),
  });
//post values-section
export const useCreateValeussec = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationKey: ["valuessection"],
    mutationFn: async (data: IValueSectionCreateDTO) =>
      await HttpClient.post<IValuessecCreateResponseDTO>(
        endpoints.aboutValues.create,
        data,
      ),
      onSuccess:()=>{
        qq.invalidateQueries({
            queryKey:["valuessection"],
        });
      }
  });
};
//update values-section
export const UseUpdateValuesec = () => {
    const qq =useQueryClient()
 return useMutation({
    mutationKey: ["valuesection"],
    mutationFn: async (data: { id:string|number ,data:IValueSectionUpdateDTO }) =>
      await HttpClient.patch<IValueSectionUpdateResponseDTO>(
        endpoints.aboutValues.patch(data.id),
        data.data,
      ),
    onSuccess: (_,variables) => {
      qq.invalidateQueries({
        queryKey: ["valuessection"],
      });
      qq.invalidateQueries({
        queryKey:["valuessection",variables.id]
      })
    },
  });
};
