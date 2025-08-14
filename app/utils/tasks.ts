export interface Task {
    _id: string;
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    createdAt: string;
    updatedAt: string;
}

export interface AddTaskInput {
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
}

export interface UpdateTaskInput {
    title?: string;
    description?: string;
    status?: "todo" | "in-progress" | "done";
}
