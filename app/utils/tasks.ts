import { z } from "zod";
import { TaskSchema } from "./TaskSchema";

export type Task = z.infer<typeof TaskSchema> & {
  id: string;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export interface AddTaskInput {
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "done";
}

export interface UpdateTaskInput {
    title?: string;
    description?: string;
  status?: "pending" | "in-progress" | "done";
  updatedAt?: Date;
  // ...other fields
}
