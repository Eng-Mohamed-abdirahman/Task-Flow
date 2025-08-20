import z from "zod";

export const TaskSchema = z.object({
  title: z.string().min(3,"Title must be at least 3 characters long").max(100,"Title must be at most 100 characters long"),
  description: z.string().min(3,"Description must be at least 3 characters long").max(500,"Description must be at most 500 characters long"),
  status: z.enum(["Pending", "In Progress", "Done"]),
}); 