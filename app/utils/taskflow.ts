"use server"
import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import z from "zod";
import { Task } from "./tasks";
import { TaskSchema } from "./TaskSchema";
import { updateSchema } from "./userSchemas";



export const getTasks = async () : Promise<Task[]> => {
    try {

        const session = await auth();
        console.log("Session in getTasks:", session);
        if (!session?.user?.id) {
            throw new Error("Not authenticated");
        }

        const userId = session.user.id;

        const tasks = await prisma.task.findMany({
            where: { userId : userId },
            orderBy: { createdAt: "desc" },
        });

        return tasks;

    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Failed to fetch tasks");   
    }
};


export const createTask = async (task: z.infer<typeof TaskSchema>): Promise<{ success?: string; error?: string }> => {

    const validateTask = TaskSchema.parse(task);
    const session = await auth();
console.log("Session in createTask:", session);
if (!session?.user?.id) {
  return { error: "Not authenticated" };
}
    try {
        const createdTask = await prisma.task.create({
            data: {
                ...validateTask,
                userId: session?.user?.id, // This must be a valid ObjectId string
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return { success: createdTask.id };
    } catch (error) {
        console.error("Error creating task:", error);
        return { error: "Failed to create task" };
    }
};



export const getTaskById = async (
  id: string
): Promise<{ task?: Task; error?: string }> => {

    if (!id) {
    return { error: "No task id provided" };
  }

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Not authenticated" };
    }

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return { error: "Task not found" };
    }

    if (task.userId !== session.user.id) {
      return { error: "Not authorized" };
    }

    return { task };
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    return { error: "Failed to fetch task" };
  }
};


export const updateTask = async (
  id: string,
  data: z.infer<typeof updateSchema>
): Promise<{ success?: string; error?: string }> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Not authenticated" };
    }

    // Find the task and ensure it belongs to the logged-in user
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return { error: "Task not found" };
    }

    if (task.userId !== session.user.id) {
      return { error: "Not authorized" };
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return { success: updatedTask.id };
  } catch (error) {
    console.error("Error updating task:", error);
    return { error: "Failed to update task" };
  }
};

export const deleteTask = async (id: string): Promise<boolean> => {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            throw new Error("Not authenticated");
        }

        const existingTask = await getTaskById(id);
        if (!existingTask) {
            throw new Error("Task not found");
        }

        await prisma.task.delete({
            where: { id: id },
        });

        return true;
    } catch (error) {
        console.error("Error deleting task:", error);
        return false;
    }
};
