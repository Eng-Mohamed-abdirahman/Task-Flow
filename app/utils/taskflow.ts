"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import z from "zod";
import { Task } from "./tasks";
import { TaskSchema } from "./TaskSchema";
import { updateSchema } from "./userSchemas";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }

    const userId = session.user.id;

    const tasksFromDb = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // Map DB results → Task type (include all required fields)
    const tasks: Task[] = tasksFromDb.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status as "Pending" | "In Progress" | "Done",
      userId: task.userId
    }));

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

export const createTask = async (
  task: z.infer<typeof TaskSchema>
): Promise<{ success?: string; error?: string }> => {
  const validateTask = TaskSchema.parse(task);
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not authenticated" };
  }

  try {
    const createdTask = await prisma.task.create({
      data: {
        ...validateTask,
        userId: session.user.id,
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

    return {
      task: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status as "Pending" | "In Progress" | "Done",
        userId: task.userId,
      },
    };
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

    const task = await prisma.task.findUnique({ where: { id } });

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

    const existingTask = await prisma.task.findUnique({ where: { id } });
    if (!existingTask) {
      throw new Error("Task not found");
    }

    if (existingTask.userId !== session.user.id) {
      throw new Error("Not authorized");
    }

    await prisma.task.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    return false;
  }
};
