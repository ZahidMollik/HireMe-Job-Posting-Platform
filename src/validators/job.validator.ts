import z from "zod";

export const createJobSchema= z.object({
  title: z.string()
         .trim()
         .min(10,{message:"name must be at least 10 characters"})
         .max(100,{message:"name must be not more than 100 characters"}),
  description:z.string()
         .min(100,{message:"description must be at least 100 characters"})
         .max(300,{message:"description must be not more than 300 characters"}),
  location:z.string()
            .trim()
            .min(6,{message:"location must be at least 6 characters"})
            .max(50,{message:"location must be not more than 50 characters"}),
  lastDateOfApply:z.string().datetime().refine(
    (dateStr) => new Date(dateStr) > new Date(),
    {
      message: "lastDateOfApply must be a future date"
    }
  ),
  salary:z.number(),
  createdBy:z.string().optional(),
  companyId:z.string().optional()
})