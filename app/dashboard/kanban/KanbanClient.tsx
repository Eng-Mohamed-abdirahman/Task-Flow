"use client";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { updateTaskAction } from "@/app/actions/updateTask";
import { Task } from "@/app/utils/tasks";

// Helper to normalize status values for frontend columns
const normalizeStatus = (status: string) => {
  if (!status) return "pending";
  const s = status.trim().toLowerCase();
  if (s === "pending") return "pending";
  if (s === "done") return "done";
  if (s === "in progress" || s === "in-progress") return "in-progress";
  return "pending";
};

// Helper to convert frontend status to backend format
const toBackendStatus = (status: string) => {
  if (status === "pending") return "Pending";
  if (status === "in-progress") return "In Progress";
  if (status === "done") return "Done";
  return "Pending";
};

// Column colors for better distinction
const columnStyles: Record<string, string> = {
  pending: "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400",
  "in-progress": "bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-400",
  done: "bg-gradient-to-br from-green-100 to-green-200 border-green-400",
};

const columns = [
  { id: "pending", name: "Pending", icon: "⏳" },
  { id: "in-progress", name: "In Progress", icon: "🚧" },
  { id: "done", name: "Done", icon: "✅" },
];

// Droppable column component
function DroppableColumn({ column, children }: any) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  return (
    <div
      ref={setNodeRef}
      className={`
        flex-1 min-w-[320px] max-w-[400px] rounded-2xl p-5 border-2 shadow-xl transition-all
        ${columnStyles[column.id] || "bg-gray-100 border-gray-300"}
        ${isOver ? "scale-105 border-4" : ""}
      `}
      style={{ minHeight: 420 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{column.icon}</span>
        <h2 className="text-xl font-bold text-gray-800">{column.name}</h2>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

// Avatar generator for cards
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold shadow">
      {initials}
    </div>
  );
}

// Sortable card component
function SortableCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id ?? "", // guard against missing id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    cursor: "grab",
    boxShadow: isDragging
      ? "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
      : "0 2px 8px 0 rgba(31, 38, 135, 0.10)",
    border: isDragging ? "2px solid #6366f1" : "none",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-xl p-4 flex flex-col gap-2 shadow-md transition-all
        hover:shadow-xl border border-gray-200
      `}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-800 text-base truncate">{task.title}</span>
        <Avatar name={task.title} />
      </div>
      <p className="text-gray-500 text-sm truncate">{task.description}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-400">
          {new Date(task.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "2-digit",
          })}
        </span>
        <span
          className={`
            text-xs px-2 py-0.5 rounded-full font-medium
            ${normalizeStatus(task.status) === "pending"
              ? "bg-blue-100 text-blue-700"
              : normalizeStatus(task.status) === "in-progress"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"}
          `}
        >
          {columns.find((c) => c.id === normalizeStatus(task.status))?.name}
        </span>
      </div>
    </div>
  );
}

export default function KanbanClient({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // Helper: get tasks for a column
  const getTasks = (columnId: string) =>
    tasks.filter((task) => normalizeStatus(task.status) === columnId);

  const findTask = (id: string) => tasks.find((t) => t.id === id);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeTask = findTask(active.id as string);
    if (!activeTask) return;

    // If dropped on a column, move to that column (at end)
    if (columns.some((col) => col.id === over.id)) {
      const newStatus = over.id as string;
      if (normalizeStatus(activeTask.status) !== newStatus) {
        const updatedTasks = tasks.map((t) =>
          t.id === activeTask.id ? { ...t, status: newStatus } : t
        );
        setTasks(updatedTasks);
        await updateTaskAction(activeTask.id, { status: toBackendStatus(newStatus) });
      }
      return;
    }

    // If dropped on a card, move within or between columns
    const overTask = findTask(over.id as string);
    if (!overTask) return;

    if (normalizeStatus(activeTask.status) === normalizeStatus(overTask.status)) {
      // Reorder within the same column
      const columnTasks = getTasks(normalizeStatus(activeTask.status));
      const oldIdx = columnTasks.findIndex((t) => t.id === active.id);
      const newIdx = columnTasks.findIndex((t) => t.id === over.id);
      if (oldIdx !== -1 && newIdx !== -1 && oldIdx !== newIdx) {
        const newOrder = arrayMove(columnTasks, oldIdx, newIdx);
        const otherTasks = tasks.filter((t) => normalizeStatus(t.status) !== normalizeStatus(activeTask.status));
        setTasks([...otherTasks, ...newOrder]);
      }
    } else {
      // Move to another column (at position of overTask)
      const updatedTasks = tasks.map((t) =>
        t.id === activeTask.id ? { ...t, status: normalizeStatus(overTask.status) } : t
      );
      setTasks(updatedTasks);
      await updateTaskAction(activeTask.id, { status: toBackendStatus(normalizeStatus(overTask.status)) });
    }
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-10 text-gray-800 text-center drop-shadow">
          🚀 Taskflow Kanban Board
        </h1>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div
            className="
              flex flex-col gap-6
              sm:flex-row sm:gap-8
              justify-center items-stretch
              overflow-x-auto
              pb-4
              "
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {columns.map((column) => (
              <DroppableColumn key={column.id} column={column}>
                <SortableContext
                  items={getTasks(column.id).map((task) => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {getTasks(column.id).map((task) => (
                    <SortableCard key={task.id} task={task} />
                  ))}
                </SortableContext>
              </DroppableColumn>
            ))}
          </div>
          <DragOverlay>
            {activeId ? (
              <SortableCard task={findTask(activeId)!} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      
    </div>
  );
}