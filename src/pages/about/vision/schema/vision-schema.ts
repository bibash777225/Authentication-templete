import z from "zod";

 export const VisionSchema = z.object({
    iconId: z.string().trim(),
    title: z.string().trim().max(200, "length Exceed"),
    description: z.string().trim().max(2000, "length Exceed")
 })
   export type IVisionData =z.infer<typeof VisionSchema>