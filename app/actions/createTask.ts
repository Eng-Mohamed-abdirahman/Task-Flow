"use server"
import { revalidatePath } from "next/cache";
import { createTask } from "../utils/taskflow";
import { redirect } from "next/navigation";
import { formSchema } from "../utils/userSchemas";
import z from "zod";

export const createTaskAction = async (formData : z.infer<typeof formSchema>) => {
    // Your task creation logic here
    const title = formData.title?.toString().trim();
    const description = formData.description?.toString().trim();
    const status = formData.status?.toString().trim();

    if (!title || !description || !status) {
        throw new Error("Missing required fields");
    }
    // Create the task object
    const newTask = {
        title,
        description,
        status
    };

    // Call the createTask function to save the task
    const result = await createTask(newTask);

    if (!result) {
        throw new Error("Failed to create task");
    }
    // revalidatePath(`/dashboard/taskList`);
    // redirect(`/dashboard/taskList`);
    return result;
}