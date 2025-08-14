import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "320px", // You can adjust this value as needed
          "--header-height": "64px",  // You can adjust this value as needed
        } as React.CSSProperties
      }
    >
      <div className="flex min-h-screen w-full">
        <AppSidebar variant="inset" />
        <div className="flex flex-1 flex-col">
          <SiteHeader />
          <main className="flex-1 flex flex-col bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}