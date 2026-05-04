
import { ROUTES } from "@/routes/routes";
import { useGetBlogById, useUpdateBlog } from "@/services/blog/blog.api";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import type { BlogFormData } from "../schemas/blog-schema";
import { showApiErrorMessage, showSuccessMessage } from "@/context/lib/helpers/sonner";



const BlogEditPage = () => {
  const blogMutation = useUpdateBlog();
  const { id } = useParams();
  const { data, isLoading } = useGetBlogById(id!);
  const navigate = useNavigate();

  if (!data) {
    if (isLoading)
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin" />
        </div>
      );
    else {
      return "Blog Not Found";
    }
  }
  const blogData = data.data.data;
  const defaultValues: BlogFormData = {
    ...blogData,
    featuredImageId: blogData.featuredImage?.id || "",
    authorId: blogData.author.id,
    category:blogData.category?.id||"",
    
  };

  return (
    <div>
      <BlogForm
        defaultValues={defaultValues}
        previewUrl={blogData.featuredImage?.path}
        onSubmit={async (data) => {
          try {
            const res = await blogMutation.mutateAsync({ id: id!, data });
            showSuccessMessage(res.data.message);
            navigate(ROUTES.blog.base);
          } catch (e) {
            showApiErrorMessage(e);
          }
        }}
      />
    </div>
  );
};

export default BlogEditPage;
