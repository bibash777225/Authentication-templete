
import { ROUTES } from "@/routes/routes";
import { useCreateBlog } from "@/services/blog/blog.api";
import { useNavigate } from "react-router";
import BlogForm from "./blog-form";
import { showApiErrorMessage, showSuccessMessage } from "@/context/lib/helpers/sonner";


const BlogCreatePage = () => {
  const blogMutation = useCreateBlog();
  const navigate = useNavigate();

  return (
    <div>
      <BlogForm
        onSubmit={async (d) => {
          try {
            const res = await blogMutation.mutateAsync(d);
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

export default BlogCreatePage;
