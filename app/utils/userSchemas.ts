import zod from "zod"

export const UserSchema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string()
  .min(6, "Password must be at least 6 characters long")
  .max(50, "Password must not exceed 50 characters"),
})


export const userRegistrationSchema = zod.object({
  username: zod.string().min(3, "Username must be at least 3 characters long"),
  email: zod.string().email("Invalid email address"),
  password: zod.string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must not exceed 50 characters"),
  confirmPassword: zod.string()
    .min(6, "Confirm Password must be at least 6 characters long")
    .max(50, "Confirm Password must not exceed 50 characters")
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords must match",
    path: ["confirmPassword"],
  }
)

export const formSchema = zod.object({
  title: zod.string().min(2, "Title is required"),
  description: zod.string().min(5, "Description is required"),
  status: zod.enum(["pending", "in-progress", "done"], {
    required_error: "Please select a status",
  }),
});
