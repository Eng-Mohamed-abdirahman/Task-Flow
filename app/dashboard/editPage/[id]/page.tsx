import { getTaskById } from "@/app/utils/taskflow";
import EditTaskForm from "./EditTaskForm";
import type { PageProps } from "next"; // Next.js 15 PageProps

export default async function EditTaskPage({ params }: PageProps<{ id: string }>) {
  const { id } = params;
  const { task, error } = await getTaskById(id);

  if (error || !task) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] w-full">
        <div className="text-center text-muted-foreground">
          {error || "Task not found."}
        </div>
      </div>
    );
  }

  return <EditTaskForm initialTask={task} />;
}
