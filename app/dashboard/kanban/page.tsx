export const dynamic = "force-dynamic";

import { getTasks } from "@/app/utils/taskflow";
import KanbanClient from "./KanbanClient";

export default async function KanbanPage() {
  const tasks = await getTasks(); 
  return <KanbanClient initialTasks={tasks} />;
}


