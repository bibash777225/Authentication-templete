import z from "zod";

export const trustedSchema = z.object({
  name: z.string().trim().max(100, "Name too long"),
  logoId: z.string().optional().nullable(),
});
  
export type ITrustedData = z.infer<typeof trustedSchema>;