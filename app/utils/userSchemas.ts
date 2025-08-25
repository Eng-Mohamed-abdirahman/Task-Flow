import z from "zod"

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string()
  .min(6, "Password must be at least 6 characters long")
  .max(50, "Password must not exceed 50 characters"),
})


export const userRegistrationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must not exceed 50 characters"),
  confirmPassword: z.string()
    .min(6, "Confirm Password must be at least 6 characters long")
    .max(50, "Confirm Password must not exceed 50 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});


export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  status: z.enum(["Pending", "In Progress", "Done"]),
});

export const updateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").optional(),
  description: z.string().min(3, "Description must be at least 3 characters long").optional(),
  status: z.enum(["Pending", "In Progress", "Done"]).optional(),
});
