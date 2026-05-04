import z from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  featuredImageId: z.string().min(1, "Media is required"),
  authorId: z.string().min(1, "Author is required"),
  shortDesc: z.string().min(1, "Short description is required"),
  longDesc: z.string().min(1, "Long description is required"),
  seoTitle: z.string().optional().nullable(),
  seoDesc: z.string().optional().nullable(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  categoryId: z.string().optional().nullable(),
  tagIds: z.array(z.string().min(1)).min(1, "At least one tag is required"),
  category:z.string().trim().min(1,"minimun length is require ")
});

export type BlogFormData = z.infer<typeof blogFormSchema>;
