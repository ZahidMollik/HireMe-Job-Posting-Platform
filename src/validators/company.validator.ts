import z from "zod";

export const createCompanySchema= z.object({
  name: z.string()
         .trim()
         .min(6,{message:"name must be at least 6 characters"})
         .max(50,{message:"name must be not more than 50 characters"}),
  location:z.string()
            .trim()
            .min(6,{message:"location must be at least 6 characters"})
            .max(50,{message:"location must be not more than 50 characters"}),
})