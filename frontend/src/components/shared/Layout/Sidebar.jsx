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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { toast } from "sonner";
import { useSession } from "@/contexts/Session/SessionContext";

const DashboardSidebar = ({ navItems }) => {
  const navigate = useNavigate();
  const { sessionData, setSessionData } = useSession();

  async function handleLogout() {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      toast.success("Logout successful!");
      setSessionData(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed! Please try again.");
    }
  }

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
                  <p className="font-semibold text-lg">
                    {sessionData?.username.charAt(0).toUpperCase() +
                      sessionData?.username.slice(1) || "Guest"}
                  </p>
                  <p>
                    {sessionData?.role
                      ? sessionData.role === "hr"
                        ? "HR"
                        : sessionData.role.charAt(0).toUpperCase() +
                          sessionData.role.slice(1)
                      : "Guest"}
                  </p>
                </div>
              </div>
              <SidebarMenu className={"mt-5"}>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title} className="px-3 py-1">
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className="flex items-center gap-3 text-lg"
                      >
                        <item.icon className="w-6 h-6" />{" "}
                        <span className="text-[1.1em] font-medium mb-0.5">
                          {item.title}
                        </span>{" "}
                      </Link>
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
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3  cursor-pointer"
                >
                  <LogOut className="rotate-180" />
                  <span className="text-[1.1em] font-medium mb-0.5">
                    Logout
                  </span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default DashboardSidebar;
