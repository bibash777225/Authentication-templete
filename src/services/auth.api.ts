import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type {
  ILoginRequestDTO,
  ILoginResponseDTO,
} from "@/types/auth.interface";
import type { ApiResponse } from "@/types/global.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginApi = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: (data: ILoginRequestDTO) =>
      HttpClient.post<ILoginResponseDTO>(endpoints.auth.login, data),
    onSuccess: () => qq.clear(),
  });
};
export const useLogoutApi = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: () => HttpClient.post<ApiResponse<null>>(endpoints.auth.logout),
    onSuccess: () => qq.clear(),
  });
};
