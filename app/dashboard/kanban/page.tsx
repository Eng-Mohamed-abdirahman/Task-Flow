"use client";
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
} from "@/components/ui/kibo-ui/kanban"; // <-- Adjust if your path is different
import { useState } from "react";

// Example icons/colors for demonstration
const icons = [
  { bg: "bg-pink-500", icon: "♀" },
  { bg: "bg-blue-400", icon: "🌐" },
  { bg: "bg-green-400", icon: "🟢" },
  { bg: "bg-yellow-400", icon: "💡" },
  { bg: "bg-purple-400", icon: "🔮" },
];

const initialColumns = [
  { id: "pending", name: "pending" },
  { id: "in-progress", name: "in progress" },
  { id: "done", name: "done" },
];

type KanbanItem = {
  id: string;
  name: string;
  column: string;
  date: string;
  icon: number;
};

const initialData: KanbanItem[] = [
  {
    id: "1",
    name: "Welcome to Breeze !",
    column: "pending",
    date: "May 17 - Jan 12, 2026",
    icon: 0,
  },
  {
    id: "2",
    name: "This is a task",
    column: "pending",
    date: "May 17 - Jan 28, 2026",
    icon: 1,
  },
  {
    id: "3",
    name: "Tasks are added to lists",
    column: "pending",
    date: "Jul 18 - Nov 24, 2025",
    icon: 2,
  },
  {
    id: "4",
    name: "... and lists are added to projects.",
    column: "pending",
    date: "Aug 1 - Oct 23, 2025",
    icon: 3,
  },
  {
    id: "5",
    name: "You can add as many projects as you like.",
    column: "pending",
    date: "Sep 1 - Dec 1, 2025",
    icon: 4,
  },
  {
    id: "6",
    name: "Click on a task to see what's behind it",
    column: "in-progress",
    date: "Jun 24 - Oct 26, 2025",
    icon: 2,
  },
  {
    id: "7",
    name: "You can add attachments to tasks and comments.",
    column: "in-progress",
    date: "Aug 5 - Nov 25, 2025",
    icon: 1,
  },
  {
    id: "8",
    name: "Try dragging task",
    column: "in-progress",
    date: "Aug 1 - Oct 23, 2025",
    icon: 0,
  },
  {
    id: "9",
    name: "... you can move tasks between lists and inside a list to prioritize certain tasks.",
    column: "in-progress",
    date: "Jul 4 - Feb 4, 2026",
    icon: 4,
  },
  {
    id: "10",
    name: "You can also add comments to tasks",
    column: "in-progress",
    date: "May 5 - Jan 10, 2026",
    icon: 3,
  },
  {
    id: "11",
    name: "Click on the small gear just left of the screen",
    column: "done",
    date: "Jul 12 - Sep 21, 2025",
    icon: 2,
  },
  {
    id: "12",
    name: "... from there you can change project settings",
    column: "done",
    date: "Jul 18 - Nov 24, 2025",
    icon: 1,
  },
  {
    id: "13",
    name: "Add new task lists by click on the 'Add a new list' link",
    column: "done",
    date: "May 17 - Jan 28, 2026",
    icon: 0,
  },
  {
    id: "14",
    name: "You can see all projects under the Projects tab",
    column: "done",
    date: "Aug 1 - Oct 23, 2025",
    icon: 4,
  },
  {
    id: "15",
    name: "Time tracking reports are under the Reports tab",
    column: "done",
    date: "May 5 - Jan 10, 2026",
    icon: 3,
  },
];

export default function Kanban() {
  const [data, setData] = useState(initialData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Kanban Board</h1>
        <KanbanProvider
          columns={initialColumns}
          data={data}
          onDataChange={setData}
        >
          {(column) => (
            <KanbanBoard
              key={column.id}
              id={column.id}
              className="bg-[#18181b]"
            >
              <KanbanHeader className="flex items-center gap-2 text-base font-semibold text-white px-4 py-3 bg-[#232329] border-b border-[#232329]">
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    column.id === "pending"
                      ? "bg-blue-400"
                      : column.id === "in-progress"
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }`}
                />
                {column.name}
              </KanbanHeader>
              <KanbanCards id={column.id}>
                {(item) => {
                  const iconIdx =
                    typeof item.icon === "number" &&
                    item.icon >= 0 &&
                    item.icon < icons.length
                      ? item.icon
                      : 0;
                  return (
                    <KanbanCard
                      key={item.id}
                      {...item}
                      className="bg-[#232329] border-none shadow-md rounded-xl p-4 mb-3 text-white"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-base">
                          {item.name}
                        </span>
                        <span
                          className={`w-7 h-7 flex items-center justify-center rounded-full text-lg ${icons[iconIdx].bg}`}
                        >
                          {icons[iconIdx].icon}
                        </span>
                      </div>
                      {/* <div className="text-xs text-gray-400">{item.date}</div> */}
                    </KanbanCard>
                  );
                }}
              </KanbanCards>
            </KanbanBoard>
          )}
        </KanbanProvider>
      </div>
    </div>
  );
}
