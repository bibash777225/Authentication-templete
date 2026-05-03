import z from "zod";

export const toolsSchema = z.object({
  name: z.string().trim().max(100, "Name too long"),
  imageId: z.string().optional().nullable(),
});

export type IToolData = z.infer<typeof toolsSchema>;
