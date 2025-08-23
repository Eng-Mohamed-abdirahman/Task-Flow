import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card"

export function MinimalCardDemo() {
  const cards = [
    {
      title: "Create Task",
      description:
        "Easily add new tasks with details, deadlines, and priorities. Stay organized and never miss a thing.",
      src: "/create (1).png", // Replace with a real create task illustration
    },
    {
      title: "Kanban Board",
      description:
        "Visualize your workflow with our intuitive Kanban board. Drag and drop tasks between columns to track progress.",
      src: "/create (2).png", // Replace with a real kanban illustration
    },
    {
      title: "Dashboard",
      description:
        "Get instant insights with a beautiful dashboard. Track your productivity, completed tasks, and more at a glance.",
      src: "/create (3).png", // Replace with a real dashboard illustration
    },
  ]
  return (
    <div className="w-full max-w-5xl mx-auto mt-30">
      <h1 className="text-2xl font-bold text-center mb-10 gradient-text">Features</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 md:gap-14 p-2 sm:p-4 w-full">
        {cards.map((card, index) => (
          <MinimalCard
            className="w-full"
            key={index}
          >
            <MinimalCardImage
              className="h-[220px] object-contain"
              src={card.src}
              alt={card.title}
            />
            <MinimalCardTitle>{card.title}</MinimalCardTitle>
            <MinimalCardDescription>
              {card.description}
            </MinimalCardDescription>
          </MinimalCard>
        ))}
      </div>
    </div>
  )
}
