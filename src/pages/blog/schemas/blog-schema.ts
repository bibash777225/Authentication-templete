import z from "zod";

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  featuredImageId: z.string().min(1, "Media is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  categoryId: z.string().optional().nullable(),
  content: z.string().min(1, "content is required"),

});

export type IBlogFormData = z.infer<typeof blogFormSchema>;
