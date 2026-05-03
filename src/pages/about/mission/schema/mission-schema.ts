import z from "zod";

export const MissionSchema = z.object({
   iconId: z.string().trim(),
  title: z.string().trim().max(200, "Length exceeded"),
   description: z.string().trim().max(1000, "Length Excedded"),
});

export type IMissionData = z.infer<typeof MissionSchema>;
