import { getTaskById } from "@/app/utils/taskflow";
import EditTaskForm from "./EditTaskForm";

interface EditTaskPageProps {
  params: { id: string };
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
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
