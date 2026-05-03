import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  imageId: z.string().optional().nullable(),

  position: z.string().trim().min(2, "Position must be at least 2 characters"),
});
export type IMemberData = z.infer<typeof memberSchema>;
