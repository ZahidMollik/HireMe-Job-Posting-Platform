import z from "zod";

export const registerUserSchema= z.object({
  name: z.string()
         .trim()
         .min(3,{message:"name must be at least 3 characters"})
         .max(50,{message:"name must be not more than 50 characters"}),
  email:z.string()
         .trim()
         .toLowerCase()
         .email({message:"please enter valid email address"}),
  password:z.string()
            .trim()
            .min(6,{message:"password must be at least 6 characters"})
            .max(50,{message:"password must be not more than 50 characters"}),
  role:z.enum(["admin","employee","jobseeker"])
        .default("jobseeker"),
  companyId:z.string()
             .optional()
             .nullable(),
  adminSecret:z.string()
             .optional()
})

export const loginUserSchema=z.object({
  email:z.string()
         .trim()
         .email({message:"please enter valid email address"}),
  password:z.string()
            .trim()
            .min(6,{message:"password must be at least 6 characters"})
            .max(50,{message:"password must be not more than 50 characters"}),
})

