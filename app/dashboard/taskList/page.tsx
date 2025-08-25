export const dynamic = "force-dynamic";
import { getTasks } from "@/app/utils/taskflow";
import RelativeTime from "@/components/RelativeTime";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import TaskActions from "./TaskActions";

dayjs.extend(relativeTime);

const statusColor: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Done: "bg-green-100 text-green-800",
};

type Task = {
  id: string;
  title: string;
  status: "Pending" | "In Progress" | "Done";
  date?: string;
  createdAt?: string | Date;
};

export default async function TaskList() {
    const tasks: Task[] = await getTasks();

    if (!tasks || tasks.length === 0) {
        return (
            <div className="flex flex-col items-center min-h-[70vh] py-8 px-2">
                <Card className="w-full max-w-xl shadow-lg border-none">
                    <CardContent className="text-center">
                        <p className="text-gray-500">No tasks available</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-[70vh] py-8 px-2">
            <Card className="w-full max-w-2xl shadow-lg border-none">
                <CardHeader>
                    <CardTitle className="text-2xl text-blue-900">Task List</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {tasks.map((task) => (
                        <Card
                            key={task.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white shadow border rounded-lg gap-2"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-lg text-gray-900 truncate">
                                    {task.title}
                                </div>
                                <div className="text-sm text-gray-500 flex flex-wrap items-center gap-1">
                                    {task.date}
                                    {task.createdAt && (
                                        <span className="ml-2 text-xs text-gray-400">
                                            • <RelativeTime date={typeof task.createdAt === "string" ? task.createdAt : task.createdAt.toISOString()} />
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-shrink-0">
                                <Badge
                                    className={`mr-2 ${statusColor[task.status]}`}
                                >
                                    {task.status === "Pending"
                                        ? "Pending"
                                        : task.status === "In Progress"
                                        ? "In Progress"
                                        : "Done"}
                                </Badge>
                                <TaskActions id={task.id} />
                            </div>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

