import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type { GenericPaginationParams } from "@/types/global.interface";
import type {
  IGetAllToolsResponseDTO,
  IToolDeleteResponseDTO,
  IToolPostResponseDTO,
  IToolUpdateResponseDTO,
  IToolPayloadDTO,
  IGetToolByIdResponseDTO,
} from "@/types/homes/tools.interface";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const useGetAllTools = (params?: GenericPaginationParams) =>
  useQuery({
    queryKey: ["tools", params],
    queryFn: async () =>
      await HttpClient.get<IGetAllToolsResponseDTO>(endpoints.tools.get),
  });
export const useGetToolById = (id: string | number) =>
  useQuery({
    queryKey: ["tools", id],
    queryFn: async () =>
      await HttpClient.get<IGetToolByIdResponseDTO>(endpoints.tools.getById(id)),
  });

export const useCreateTool = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: async (data: IToolPayloadDTO) =>
      await HttpClient.post<IToolPostResponseDTO>(endpoints.tools.post, data),
    onSuccess: () => {
      qq.invalidateQueries({
        queryKey: ["tools"],
      });
    },
  });
};
export const useUpdateTool = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string | number; data: IToolPayloadDTO }) =>
      await HttpClient.patch<IToolUpdateResponseDTO>(
        endpoints.tools.update(data.id),
        data.data,
      ),
    onSuccess: (_, variables) => {
      qq.invalidateQueries({
        queryKey: ["tools"],
      });
      qq.invalidateQueries({
        queryKey: ["tools", variables.id],
      });
    },
  });
};
export const useDeleteTool = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) =>
      await HttpClient.delete<IToolDeleteResponseDTO>(
        endpoints.tools.delete(id),
      ),
    onSuccess: (_, id) => {
      qq.invalidateQueries({
        queryKey: ["tools"],
      }); 
      qq.invalidateQueries({
        queryKey: ["tools", id],
      });
    },
  });
};
