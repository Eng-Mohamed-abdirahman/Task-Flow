import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTasks } from "@/app/utils/taskflow";
import { IconLoader, IconCheck, IconClock } from "@tabler/icons-react";

export default async function UserTaskReportCard() {
  const tasks = await getTasks();

  // Count tasks by status (normalize for safety)
  const counts = {
    pending: 0,
    "in-progress": 0,
    done: 0,
  };

  tasks.forEach((task) => {
    const status = task.status.toLowerCase().replace(/\s+/g, "-");
    if (status === "pending") counts.pending += 1;
    else if (status === "in-progress") counts["in-progress"] += 1;
    else if (status === "done") counts.done += 1;
  });

  return (
    <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg">
        <CardHeader>
          <CardDescription className="text-blue-700 font-medium">Your Task Report</CardDescription>
          <CardTitle className="text-3xl font-bold text-blue-900">Task Overview</CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <div className="flex flex-col items-center bg-white rounded-xl shadow p-4 border border-blue-100">
              <IconClock className="text-blue-400 mb-2" size={32} />
              <span className="text-2xl font-bold text-blue-700">{counts.pending}</span>
              <span className="text-blue-700 font-medium mt-1">Pending</span>
              <Badge variant="outline" className="mt-2">Waiting to start</Badge>
            </div>
            <div className="flex flex-col items-center bg-white rounded-xl shadow p-4 border border-yellow-100">
              <IconLoader className="text-yellow-500 mb-2 animate-spin" size={32} />
              <span className="text-2xl font-bold text-yellow-700">{counts["in-progress"]}</span>
              <span className="text-yellow-700 font-medium mt-1">In Progress</span>
              <Badge variant="outline" className="mt-2">Currently working</Badge>
            </div>
            <div className="flex flex-col items-center bg-white rounded-xl shadow p-4 border border-green-100">
              <IconCheck className="text-green-500 mb-2" size={32} />
              <span className="text-2xl font-bold text-green-700">{counts.done}</span>
              <span className="text-green-700 font-medium mt-1">Done</span>
              <Badge variant="outline" className="mt-2">Completed</Badge>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}