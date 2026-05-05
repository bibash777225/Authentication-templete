import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type {
  IBlogCreateResponseDTO,
  IBlogDeleteResponseDTO,
  IBlogPayLoadDTO,
  IBlogResponseDTO,
  IBlogUpadateResponseDTO,
} from "@/types/blog/blog-interface";
import type { GenericPaginationParams } from "@/types/global.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllBlogApi = (params?: GenericPaginationParams) =>
  useQuery({
    queryKey: ["blog", params],
    queryFn: async () =>
      await HttpClient.get<IBlogResponseDTO>(endpoints.blog.get, {
        params,
      }),
  });

//post blog
export const useCreateBlog = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationFn: async (data: IBlogPayLoadDTO) =>
      await HttpClient.post<IBlogCreateResponseDTO>(
        endpoints.blog.create,
        data,
      ),
    onSuccess: () => {
      qq.invalidateQueries({
        queryKey: ["blog"],
      });
    },
  });
};

//update blog
export const useUpdateBlog = () => {
  const qq = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string | number; data: IBlogPayLoadDTO }) =>
      await HttpClient.patch<IBlogUpadateResponseDTO>(
        endpoints.blog.update(data.id),
        data.data,
      ),
    onSuccess: (_, variables) => {
      qq.invalidateQueries({ queryKey: ["blog"] });
      qq.invalidateQueries({ queryKey: ["blog", variables.id] });
    },
  });
};

//delete blog
export const useDeleteBlog = () => {
  const qq = useQueryClient();

  return useMutation({
    mutationKey: ["blog"],
    mutationFn: async (id: string | number) =>
      await HttpClient.delete<IBlogDeleteResponseDTO>(
        endpoints.blog.delete(id),
      ),
    onSuccess: (_, id) => {
      qq.invalidateQueries({ queryKey: ["blog"] });
      qq.invalidateQueries({ queryKey: ["blog", id] });
    },
  });
};
