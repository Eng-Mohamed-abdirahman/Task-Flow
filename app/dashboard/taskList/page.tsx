"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tasks = [
	{
		id: 1,
		title: "Incentivize collaborative partnerships",
		date: "May 17 – Jan 12, 2026",
		status: "pending",
	},
	{
		id: 2,
		title: "Streamline virtual ROI",
		date: "Jun 24 – Oct 26, 2025",
		status: "in-progress",
	},
	{
		id: 3,
		title: "Benchmark value-added niches",
		date: "Jul 12 – Sep 21, 2025",
		status: "done",
	},
	{
		id: 4,
		title: "Exploit integrated web services",
		date: "Jul 18 – Nov 24, 2025",
		status: "pending",
	},
];

const statusColor: Record<string, string> = {
	pending: "bg-yellow-100 text-yellow-800",
	"in-progress": "bg-blue-100 text-blue-800",
	done: "bg-green-100 text-green-800",
};

const TaskList = () => {
	return (
		<div className="flex flex-col items-center min-h-[70vh]   py-8">
			<Card className="w-full max-w-2xl shadow-lg border-none">
				<CardHeader>
					<CardTitle className="text-2xl text-blue-900">Task List</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					{tasks.map((task) => (
						<Card
							key={task.id}
							className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white shadow border rounded-lg"
						>
							<div>
								<div className="font-semibold text-lg text-gray-900">
									{task.title}
								</div>
								<div className="text-sm text-gray-500">{task.date}</div>
							</div>
							<Badge
								className={`mt-2 md:mt-0 ${statusColor[task.status]}`}
							>
								{task.status === "pending"
									? "Pending"
									: task.status === "in-progress"
									? "In Progress"
									: "Done"}
							</Badge>
						</Card>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default TaskList;

