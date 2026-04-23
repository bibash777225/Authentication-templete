
import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type { AboutcontentFormDTO } from "@/pages/aboutcontent/schema/aboutcontent.schema";
import type { IGetAllAboutcontentDTO, IPatchAboutcontentDTO } from "@/types/aboutcontent/aboutcontent";
import type { GenericPaginationParams } from "@/types/global.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//get all
export const useGetAboutcontent = (params?: GenericPaginationParams) =>
  useQuery({
    queryKey: ["aboutcontent", params],
    queryFn: () =>
      HttpClient.get<IGetAllAboutcontentDTO>(endpoints.aboutValuesitem.getAll, {
        params,
      }),
    select: (d) => d.data,
  });

//update
export const useUpdateAboutcontent = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationKey: ["aboutcontent"],
    mutationFn: async (data: {
      id: string | number;
      data: Partial<AboutcontentFormDTO>;
    }) =>
      await HttpClient.patch<IPatchAboutcontentDTO>(
        // somehow backend doesnot require id in this specific endpoint. id is still there as the backend may need it in future
        endpoints.aboutValuesitem.update(data.id),
        data.data,
      ),
    onSuccess: (_, variables) => {
      qq.invalidateQueries({
        queryKey: ["aboutcontent"],
      });
      qq.invalidateQueries({
        queryKey: ["aboutcontent", variables.id],
      });
    },
  });
};
