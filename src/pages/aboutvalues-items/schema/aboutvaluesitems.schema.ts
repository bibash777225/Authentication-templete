import z from "zod";

export const AboutValuesItemsSchema = z.object({
  iconId: z.string().min(1, "Icon is required"), 
  title: z.string().trim().min(1, "Heading is required"),
  description: z.string().trim().min(1, "Long Description is Required"),
});

export type IValuesItemsData = z.infer<typeof AboutValuesItemsSchema>;