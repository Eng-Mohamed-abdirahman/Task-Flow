import { getTasks } from "@/app/utils/taskflow";
import KanbanClient from "./KanbanClient";

export default async function KanbanPage() {
  const tasks = await getTasks(); 
 
  // Fetch from backend
  return <KanbanClient initialTasks={tasks} />;
}


