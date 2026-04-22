import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type { ApiResponse } from "@/types/global.interface";
import { useQuery } from "@tanstack/react-query";
interface IDashboard {
  enquiriesCount: number;
  teamMemberCount: number;
  serviceCount: number;
}
export const useGetDashboardData = () =>
  useQuery({
    queryKey: ["dashboard"],
    queryFn: () =>
      HttpClient.get<ApiResponse<IDashboard>>(endpoints.dashboard.getdata),
    select: (d) => d.data,
  });
