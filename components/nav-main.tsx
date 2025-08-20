"use client"

import { usePathname } from "next/navigation";
import { IconCirclePlusFilled, IconMail, Icon } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ClipboardCheck } from "lucide-react";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: any;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">

          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="flex flex-col gap-5 h-8 mt-5">
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title} >
                <Link href={item.url} className="cursor-pointer">
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={
                      (isActive ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear" : "")  +
                      " min-w-8 duration-200 ease-linear cursor-pointer text-lg"}
                  >
                    {item.icon && <item.icon className="w-6 h-6" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
