"use server"
import { revalidatePath } from "next/cache";
import { deleteTask } from "../utils/taskflow";

export const deleteTaskAction = async (id: string) => {
  if (!id) {
    throw new Error("Invalid task ID");
  }

  // Replace with your actual delete logic
  const task = await deleteTask(id);
  if (!task) {
    throw new Error("Failed to delete task");
  }
  revalidatePath(`/dashboard/taskList`);
  return true;
};
