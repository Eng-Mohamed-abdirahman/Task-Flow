import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { getTasks } from "@/app/utils/taskflow";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import Link from "next/link";

dayjs.extend(relativeTime);

const statusColor: Record<string, string> = {
	pending: "bg-yellow-100 text-yellow-800",
	"in-progress": "bg-blue-100 text-blue-800",
	done: "bg-green-100 text-green-800",
};

export default async function TaskList() {
	const tasks = await getTasks();

	return (
		<div className="flex flex-col items-center min-h-[70vh] py-8">
			<Card className="w-full max-w-2xl shadow-lg border-none">
				<CardHeader>
					<CardTitle className="text-2xl text-blue-900">Task List</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					{tasks.map((task: any) => (
						<Card
							key={task._id}
							className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white shadow border rounded-lg"
						>
							<div className="flex-1">
								<div className="font-semibold text-lg text-gray-900">
									{task.title}
								</div>
								<div className="text-sm text-gray-500">
									{task.date}
									{task.createdAt && (
										<span className="ml-2 text-xs text-gray-400">
											• {dayjs(task.createdAt).fromNow()}
										</span>
									)}
								</div>
							</div>
							<div className="flex items-center gap-2 mt-2 md:mt-0">
								<Badge
									className={`mr-2 ${statusColor[task.status]}`}
								>
									{task.status === "pending"
										? "Pending"
										: task.status === "in-progress"
										? "In Progress"
										: "Done"}
								</Badge>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8"
										>
											<EllipsisVertical className="w-5 h-5" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem asChild>
											<Link href={`/dashboard/edit/${task._id}`}>
												Edit
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem
											className="text-red-600"
											// onClick={() => handleDelete(task._id)} // Implement this handler as needed
										>
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</Card>
					))}
				</CardContent>
			</Card>
		</div>
	);
}

