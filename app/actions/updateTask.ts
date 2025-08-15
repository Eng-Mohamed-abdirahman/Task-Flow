"use server";
import { UpdateTask, getTaskById } from "@/app/utils/taskflow";
import { revalidatePath } from "next/cache";

export const updateTaskAction = async (id: string, formData: { status: string }) => {
  // Validate status if needed
  if (!["pending", "in-progress", "done"].includes(formData.status)) {
    throw new Error("Invalid status");
  }

  const existingTask = await getTaskById(id);
  if (!existingTask) {
    throw new Error("Task not found");
  }

  // Add updatedAt field
  const updatedTask = await UpdateTask(id, { 
    status: formData.status, 
    updatedAt: new Date() 
  });

  if (!updatedTask) {
    throw new Error("Failed to update task");
  }

  revalidatePath("/dashboard/kanban");
  revalidatePath("/dashboard/taskList");

  return true;
};
