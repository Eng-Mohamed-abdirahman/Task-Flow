// "use server"
import z from "zod";
import { formSchema } from "../utils/userSchemas";
import { UpdateTask, getTaskById } from "@/app/utils/taskflow";

export const updateTaskAction = async (id: string, formData: z.infer<typeof formSchema>) => {
  // Replace with your actual update logic
    if (!id || !formData) {
      throw new Error("Invalid input");
    }

    const existingTask = await getTaskById(id);
    if (!existingTask) {
      throw new Error("Task not found");
    }

  const updatedTask = await UpdateTask(id, {
    title: formData.title,
    description: formData.description,
    status: formData.status,
  });
    if (!updatedTask) {
        throw new Error("Failed to update task");
    }

    return true;
};
