import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const HRSidebar = () => {
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-2xl font-semibold mt-2">
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex mt-6 items-center ml-2 gap-2">
                <div>
                  <Avatar className={"h-12 w-12"}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="font-semibold text-lg italic">Full Name</p>
                </div>
              </div>
              <SidebarMenu className={"mt-4"}>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="p-3">
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-3 text-lg"
                      >
                        <item.icon className="w-6 h-6" />{" "}
                        <span className="text-lg font-medium">
                          {item.title}
                        </span>{" "}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className={"p-3"}>
              <SidebarMenuButton asChild>
                <a href={"/logout"} className="flex items-center gap-3 text-lg">
                  <LogOut className="rotate-180" />
                  <span className="text-lg font-medium">Logout</span>{" "}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default HRSidebar;
