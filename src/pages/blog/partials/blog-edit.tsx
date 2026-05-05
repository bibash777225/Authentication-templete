
import { Edit, Loader2 } from "lucide-react";
import { showApiErrorMessage, showSuccessMessage } from "@/context/lib/helpers/sonner";
import type { IBlog } from "@/types/blog/blog-interface";
import { useUpdateBlog } from "@/services/blog/blog.api";
import type { IBlogFormData } from "../schemas/blog-schema";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BlogForm from "./blog-form";



type Props = {
  data: IBlog;
};
const BlogEditPageDialog = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const defaultValues: IBlogFormData = {
    title: data.title,
    featuredImageId:data.featuredImageID,
    slug: data.slug,
    content:data.content,
    shortDescription:data.shortDescription

  };

  const { mutateAsync, isPending } = useUpdateBlog();

  const onSubmit = async (formData: IBlogFormData) => {
    try {
      const res = await mutateAsync({
        id: data.id,
        data: formData,
      });

      showSuccessMessage(res.data.message);
      setOpen(false);
    } catch (error) {
      showApiErrorMessage(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-violet-100 text-violet-500 transition">
          <Edit size={13} />
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-0 overflow-hidden rounded-xl">
        <div className="px-5 py-4 border-b">
          <DialogTitle className="text-base font-semibold text-gray-800">
            Edit item
          </DialogTitle>
          <p className="text-xs text-gray-400 mt-0.5">
            Update the fields below and save
          </p>
        </div>

        <div className="px-5 py-4">
          {isPending ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-gray-400" />
            </div>
          ) : (
            <BlogForm
              defaultValues={defaultValues}
              defaultImage={data?.featuredImage}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogEditPageDialog;
