"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ClipboardCheck, SquareKanban , ListCheck} from "lucide-react"
import { title } from "process"
import { auth } from "@/auth"
import { useSession } from "next-auth/react"

const data = {
  navMain: [
    {
      title: "Create Task",
      url: "/dashboard/newTask",
      icon: ClipboardCheck ,
    },
    {
      title: "Task List",
      url: "/dashboard/taskList",
      icon: ListCheck,
    },
    {
      title: "Kanban",
      url: "/dashboard/kanban",
      icon: SquareKanban, // Adjusted to use a React component
    },
     {
      title: "Reports",
      url: "/dashboard/reports",
      icon: IconReport,
    }
    
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


 


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-xl group transition-all hover:bg-primary/10">
  <span className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/80 to-teal-400 text-white shadow w-9 h-9">
    <ClipboardCheck className="w-5 h-5" />
  </span>
  <span className="text-xl font-extrabold bg-gradient-to-r from-primary via-teal-500 to-purple-500 bg-clip-text text-transparent tracking-tight group-hover:opacity-90 transition">
    Task Management
  </span>
</a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
