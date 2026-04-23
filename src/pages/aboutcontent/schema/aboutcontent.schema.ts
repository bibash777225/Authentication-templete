import { z } from "zod";
export const featureItemSchema = z.object({
  title: z
    .string()
    .min(1, "Feature title is required")
    .min(2, "Feature title must be at least 2 characters"),

  desc: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters"),

 
});

export const AboutcontentFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  tag: z.string().min(1, "Subtitle is required"),
  items: z.array(featureItemSchema).min(1, "At least one feature is required"),
});

export type AboutcontentFormDTO = z.infer<typeof AboutcontentFormSchema>;
