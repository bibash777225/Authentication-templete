import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type { GenericPaginationParams } from "@/types/global.interface";
import type { IGetAllTrustedResponseDTO, IGetTrustedByIdResponseDTO, ITrustedDeleteResponseDTO, ITrustedPayloadDTO, ITrustedPostResponseDTO, ITrustedUpdateResponseDTO } from "@/types/homes/trusted.interface";


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllTrusted = (params?: GenericPaginationParams) =>
  useQuery({
    queryKey: ["trusted", params],
    queryFn: async () =>
      await HttpClient.get<IGetAllTrustedResponseDTO>(endpoints.trusted.get),
  });
export const useGetTrustedById = (id: string | number) =>
  useQuery({
    queryKey: ["trusted", id],
    queryFn: async () =>
      await HttpClient.get<IGetTrustedByIdResponseDTO>(
        endpoints.trusted.getById(id),
      ),
  });

export const useCreateTrusted = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: async (data: ITrustedPayloadDTO) =>
      await HttpClient.post<ITrustedPostResponseDTO>(
        endpoints.trusted.post,
        data,
      ),
    onSuccess: () => {
      qq.invalidateQueries({
        queryKey: ["trusted"],
      });
    },
  });
};
export const useUpdateTrusted = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string | number;
      data: ITrustedPayloadDTO;
    }) =>
      await HttpClient.patch<ITrustedUpdateResponseDTO>(
        endpoints.trusted.update(data.id),
        data.data,
      ),
    onSuccess: (_, variables) => {
      qq.invalidateQueries({
        queryKey: ["trusted"],
      });
      qq.invalidateQueries({
        queryKey: ["trusted", variables.id],
      });
    },
  });
};
export const useDeleteTrusted = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) =>
      await HttpClient.delete<ITrustedDeleteResponseDTO>(
        endpoints.trusted.delete(id),
      ),
    onSuccess: (_, id) => {
      qq.invalidateQueries({
        queryKey: ["trusted"],
      });
      qq.invalidateQueries({
        queryKey: ["trusted", id],
      });
    },
  });
};
