import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type {
  IMissionGetResponseDTO,
  IMissionPatchResponseDTO,
  IMissionUpdateDTO,
} from "@/types/about/mission.interface";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetMission = () =>
  useQuery({
    queryKey: ["mission"],
    queryFn: () =>
      HttpClient.get<IMissionGetResponseDTO>(endpoints.aboutMission.get),
  });
export const useUpdateMission = () =>
  useMutation({
    mutationFn: (data: IMissionUpdateDTO) =>
      HttpClient.patch<IMissionPatchResponseDTO>(
        endpoints.aboutMission.patch,
        data,
      ),
  });
