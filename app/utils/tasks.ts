export interface Task {
    _id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "done";
    createdAt: string;
    updatedAt: string;
}

export interface AddTaskInput {
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "done";
}

export interface UpdateTaskInput {
  status?: "pending" | "in-progress" | "done";
  updatedAt?: Date;
  // ...other fields
}
