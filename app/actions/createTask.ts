"use server";
import { createTask } from "@/app/utils/taskflow";
import { TaskSchema } from "@/app/utils/TaskSchema";
import { z } from "zod";

export async function createTaskAction(values: z.infer<typeof TaskSchema>) {

    const response = await createTask(values);

    if (!response) {
        throw new Error("Failed to create task");
    }

    return response;
}