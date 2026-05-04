import { useQueryParamsState } from "@/hooks/useQueryParamState";
import {
  useCreateBlog,
  useDeleteBlog,
  useGetAllBlogApi,
  useUpdateBlog,
} from "@/services/blog/blog.api";

// type IBlogFormState =
//   | { mode: "new" }
//   | { mode: "edit"; id: string }
//   | undefined;

export const useBlog = () => {
  const [pagination, setPagination] = useQueryParamsState({
    page: 1,
    take: 10,
    searchTerm: "",
  });

  const { data, isLoading } = useGetAllBlogApi(pagination);

  const { mutateAsync: remove } = useDeleteBlog();
  const { mutateAsync: add } = useCreateBlog();
  const { mutateAsync: update } = useUpdateBlog();

  return {
    blogData: data?.data,
    remove,
    add,
    update,
    isLoading,
    pagination,
    setPagination,
  };
};
