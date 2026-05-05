import ImageUploader from "@/components/form/image-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import InputField from "@/components/ui/input-field";

import type { MediaDTO } from "@/types/global.interface";
import { blogFormSchema, type IBlogFormData } from "../schemas/blog-schema";
import { useNavigate } from "react-router";


interface IBlogFormProps {
  defaultValues?: IBlogFormData;
  defaultImage?: MediaDTO | string;
  onSubmit?: (data: IBlogFormData) => void | Promise<void>;
}
const BlogForm: React.FC<IBlogFormProps> = ({
  defaultValues,
  defaultImage,
  onSubmit,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(blogFormSchema),
  });
  const onFormSubmit = handleSubmit((data) => {
    
    onSubmit?.(data);
  });
  const navigate=useNavigate()

  return (
    <form onSubmit={onFormSubmit} className="gap-4 xl:grid grid-cols-3">
      <div className="sm:col-span-3 xl:col-span-2 bg-white shadow-sm p-6 rounded-lg">
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="md:col-span-2">
            <Controller
              name="featuredImageId"
              control={control}
              render={({ field, fieldState }) => (
                <ImageUploader
                  label="Blog Image"
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error}
                  image={defaultImage}
                />
              )}
            />
          </div>

          <div>
            <InputField
              label="Blog Name"
              {...register("title")}
              error={errors.title?.message}
              required
            />
          </div>

          <div>
          
          </div>
          {/* <div>
            <Controller
              name="tagIds"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <MultipleSelect
                  options={
                    tags?.data.data?.map((d) => ({
                      label: d.tagName,
                      value: d.id,
                    })) || []
                  }
                  label="Blog Tags"
                  {...field}
                  value={field.value || undefined}
                  onChange={(v) => field.onChange(v || undefined)}
                  error={error?.message}
                  required
                />
              )}
            />
          </div> */}

          <div>
            <InputField
              label="Slug"
              {...register("slug")}
              error={errors.slug?.message}
              required
            />
          </div>
          
          <div>
            <InputField
              label="Short Description"
              {...register("shortDescription")}
              error={errors.shortDescription?.message}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 bg-white p-6 rounded-lg">
        <div>
          <div className="mt-6">
            <p className="my-2 font-medium">SEO</p>

            <div className="space-y-4">
              <InputField
                label="SEO Title"
                {...register("seoTitle")}
                error={errors?.seoTitle?.message}
              />
              <div className="md:col-span-2">
                <InputField
                  label="Content"
                  {...register("content")}
                  error={errors.content?.message}
                  required
                />
              </div>
              <InputField
                label="SEO Description"
                {...register("seoDescription")}
                error={errors?.seoDescription?.message}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-5 mt-5">
          <div className="flex justify-end items-center gap-2.5 space-x-4">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="bg-white hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 font-medium text-gray-700 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center bg-orange-600 hover:bg-orange-700 disabled:opacity-50 shadow-sm px-4 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 font-medium text-white text-sm disabled:cursor-not-allowed grow"
            >
              Submit{" "}
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
