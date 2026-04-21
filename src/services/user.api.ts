
import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type { IGetAllUsersDTO, IGetProfileDTO } from "@/types/user.interface";
import { useQuery } from "@tanstack/react-query";

export const useGetMeApi = () =>
  useQuery({
    queryKey: ["get-me"],
    queryFn: () => HttpClient.get<IGetProfileDTO>(endpoints.user.profile),
    retry: false,
    refetchInterval: 30 * 1000,
  });
export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["all-users"],
    queryFn: () => HttpClient.get<IGetAllUsersDTO>(endpoints.user.getAll),
  });
