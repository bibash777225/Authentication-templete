
import { HttpClient } from "@/context/lib/network/http-client";
import { endpoints } from "@/core/constant/endpoint";
import type { BlogFormData } from "@/pages/blog/schemas/blog-schema";
import type { IBlogCreateResponseDTO, IBlogDeleteResponseDTO, IBlogResponseDTO, IBlogSingleResponseDTO, IBlogUpadateResponseDTO } from "@/types/blog/blog-interface";
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

//get by id
export const useGetBlogById = (id: string | number) =>
  useQuery({
    queryKey: ["blog", id],
    queryFn: async () =>
      await HttpClient.get<IBlogSingleResponseDTO>(endpoints.blog.byId(id)),
  });

//post blog
export const useCreateBlog = () => {
  const qq = useQueryClient();
  return useMutation({
    mutationKey: ["blog"],
    mutationFn: async (data: BlogFormData) =>
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
    mutationFn: async (data: {
      id: string | number;
      data: Partial<BlogFormData>;
    }) =>
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
