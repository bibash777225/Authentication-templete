import ImageUploader from "@/components/form/image-input";

import { MultipleSelect } from "@/components/form/multiple-select";
import RichTextEditor from "@/components/form/rich-text-editor";
import SelectDropdown from "@/components/form/select-dropdown";

import { useGetAllUsers } from "@/services/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { blogFormSchema, type BlogFormData } from "../schemas/blog-schema";
import InputField from "@/components/ui/input-field";


const BlogForm: React.FC<{
  defaultValues?: Partial<BlogFormData>;
  onSubmit?: (d: BlogFormData) => Promise<void> | void;
  previewUrl?: string;
}> = ({ onSubmit, defaultValues, previewUrl }) => {
  const form = useForm<BlogFormData>({
    defaultValues,
    resolver: zodResolver(blogFormSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;
  const { data: categories } = useGetAllBlogCategory();
  const { data: tags } = useGetAllBlogTags();
  const { data: users } = useGetAllUsers();
  console.log(users?.data.data);

  const navigate = useNavigate();

  return (
    <form
      onSubmit={handleSubmit(
        async (d) => await onSubmit?.(d),
        (e) => console.error(e),
      )}
      className="gap-4 xl:grid grid-cols-3"
    >
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
                  image={previewUrl}
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
            <Controller
              name="categoryId"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <SelectDropdown
                  options={
                    categories?.data.data?.map((d) => ({
                      label: d.categoryName,
                      value: d.id,
                    })) || []
                  }
                  label="Blog Category"
                  {...field}
                  value={field.value || ""}
                  onChange={(v) => field.onChange(v || undefined)}
                  error={error}
                  required
                />
              )}
            />
          </div>
          <div>
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
          </div>

          <div>
            <InputField
              label="Slug"
              {...register("slug")}
              error={errors.slug?.message}
              required
            />
          </div>
          <div>
            <Controller
              name="authorId"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <SelectDropdown
                  options={
                    users?.data.data?.map((d) => ({
                      label: d.fullName,
                      value: d.id,
                    })) || []
                  }
                  label="Blog Author"
                  {...field}
                  value={field.value || ""}
                  onChange={(v) => field.onChange(v || undefined)}
                  error={error}
                  required
                />
              )}
            />
          </div>
          <div>
            <InputField
              label="Short Description"
              {...register("shortDesc")}
              error={errors.shortDesc?.message}
              required
            />
          </div>
          <div className="lg:col-span-2">
            <Controller
              {...register(`longDesc`)}
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <RichTextEditor
                  label="Description"
                  value={field.value || ""}
                  onChange={field.onChange}
                  error={error?.message}
                />
              )}
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

              <InputField
                label="SEO Description"
                {...register("seoDesc")}
                error={errors?.seoDesc?.message}
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
