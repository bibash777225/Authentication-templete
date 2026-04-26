import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type { IvisionGetResponseDTO, IvisionPatchResponseDTO, IvisionUpdateDTO } from "@/types/about/vision.interface";

import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetVision = () =>
  useQuery({
    queryKey: ["mission"],
    queryFn: () =>
      HttpClient.get<IvisionGetResponseDTO>(endpoints.aboutVision.get),
  });
export const useUpdateVision = () =>
  useMutation({
    mutationFn: (data: IvisionUpdateDTO) =>
      HttpClient.patch<IvisionPatchResponseDTO>(
        endpoints.aboutVision.patch,
        data,
      ),
  });
