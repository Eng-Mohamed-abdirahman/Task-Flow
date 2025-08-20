"use server";

import { getTaskById, updateTask } from "@/app/utils/taskflow";
import { revalidatePath } from "next/cache";
import { updateSchema } from "../utils/userSchemas"; // schema hal meel ku hay
import z from "zod";

export const updateTaskAction = async (id: string, formData: z.infer<typeof updateSchema>) => {

  

  const validate = updateSchema.safeParse(formData);

  if (!validate.success) {
    return { error: "Validation failed", details: validate.error.format() };
  }

  const updatedTask = await updateTask(id, validate.data);

  revalidatePath("/dashboard/kanban");
  revalidatePath("/dashboard/taskList");

  return { success: true, data: updatedTask };
};
