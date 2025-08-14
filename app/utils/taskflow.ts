import { ObjectId } from "mongodb";
import { getCollection } from "./db";
import { AddTaskInput, Task, UpdateTaskInput } from "./tasks";
import { UserSchema } from "./userSchemas";
import z from "zod";



export const getTasks = async () : Promise<Task[]> => {
    try {

        const collection = await getCollection()

        const tasks = await collection.find().toArray();

        return tasks.map((task) =>({
            _id: task._id.toString(),
            title: task.title,
            description: task.description,
            status: task.status,
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.updatedAt?.toISOString()
        }));

    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Failed to fetch tasks");   
    }
};


export const createTask = async (task: AddTaskInput): Promise<String | null> => {
    try {
        const collection = await getCollection();
        const result = await collection.insertOne({
            ...task,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return result.insertedId.toString();
    } catch (error) {
        console.error("Error creating task:", error);
        return null;
    }
};

export const getTaskById = async (id: string): Promise<Task | null> => {
    try {
        const collection = await getCollection();
        const task = await collection.findOne({ _id: new ObjectId(id) });
        if (!task) return null;
        return {
            _id: task._id.toString(),
            title: task.title,
            description: task.description,
            status: task.status,
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.updatedAt?.toISOString()
        };
    } catch (error) {
        console.error("Error fetching task by ID:", error);
        return null;
    }
};

export const UpdateTask = async (id: string, task: UpdateTaskInput): Promise<boolean> => {
    try {
        const collection = await getCollection();
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: task });
        return result.modifiedCount > 0;
    } catch (error) {
        console.error("Error updating task:", error);
        return false;
    }
};

export const deleteTask = async (id: string): Promise<boolean> => {
    try {
        const collection = await getCollection();
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    } catch (error) {
        console.error("Error deleting task:", error);
        return false;
    }
};




export const loginGithub = async (data: z.infer<typeof UserSchema>) => {
    
}