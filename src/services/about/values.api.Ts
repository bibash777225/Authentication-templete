import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import {
  type IValuesItemsCreateResponseDTO,
  type IValuesItemsUpdateResponseDTO,
  type IValuesItemsResponseDTO,
  type IValuesItemsPayloadDTO,
  type IValuesItemsDeleteResponseDTO,
} from "@/types/about/values-items.interface";
import type { GenericPaginationParams } from "@/types/global.interface";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
//get values-section
export const UseGetAllValuesItemsApi = (params?: GenericPaginationParams) =>
  useQuery({
    queryKey: ["valuesitems", params],
    queryFn: async () =>
      await HttpClient.get<IValuesItemsResponseDTO>(endpoints.aboutValues.get),
  });
//post values-section
export const useCreateValeusItems = () => {
  const qq = useQueryClient();
  return useMutation({
    
    mutationFn: async (data: IValuesItemsPayloadDTO) =>
      await HttpClient.post<IValuesItemsCreateResponseDTO>(endpoints.aboutValues.post,data),
    onSuccess: () => {
      qq.invalidateQueries({
        queryKey: ["valuesitems"],
      });
    },
  });
};
//update values-section
export const UseUpdateValuesItems = () => {
  const qq = useQueryClient();
  return useMutation({
   
    mutationFn: async (data: {
      id: string | number;
      data: IValuesItemsPayloadDTO;
    }) =>
      await HttpClient.patch<IValuesItemsUpdateResponseDTO>(
        endpoints.aboutValues.patch(data.id),
        data.data,
      ),
    onSuccess: (_, variables) => {
      qq.invalidateQueries({
        queryKey: ["valuesitems"],
      });
      qq.invalidateQueries({
        queryKey: ["valuesitems", variables.id],
      });
    },
  });
};
//delete-value-items
export const useDeleteValuesItems = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) =>
      await HttpClient.delete<IValuesItemsDeleteResponseDTO>(
        endpoints.aboutValues.delete(id),
      ),
    onSuccess: (_, id) => {
      qq.invalidateQueries({
        queryKey: ["valuesitems"],
      });
      qq.invalidateQueries({
        queryKey: ["valuesitems", id],
      });
    },
  });
};
