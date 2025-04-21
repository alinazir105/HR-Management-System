import React, { useState } from "react";
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
import { Loader2, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { toast } from "sonner";
import { useSession } from "@/contexts/Session/SessionContext";
import { disconnectSocket } from "@/lib/socketService";
import LoadingScreen from "@/components/ui/LoadingScreen";
import LoadingIcon from "@/components/ui/LoadingIcon";

const DashboardSidebar = ({ navItems }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionData, setSessionData } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      toast.success("Logout successful!");
      disconnectSocket();
      navigate("/login");
      setTimeout(() => {
        setSessionData(null);
      }, 50);
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed! Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <Sidebar className={"z-50"}>
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
                    {sessionData?.email.split("@")[0].charAt(0).toUpperCase() +
                      sessionData?.email.split("@")[0].slice(1) || "Guest"}
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
              <SidebarMenu className={"mt-6"}>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className={`mt-1 hover:bg-gray-100 rounded-md ${
                        isActive ? "bg-gray-100" : ""
                      }`}
                    >
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.url}
                          className={`flex items-center px-5 py-5 gap-3 text-lg hover:px-6 hover:bg-transparent`}
                        >
                          <item.icon className="w-7 h-7" />{" "}
                          <span className={`text-[1.1em] font-medium mb-0.5 `}>
                            {item.title}
                          </span>{" "}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className={"mb-0.5"}>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-5 py-5 cursor-pointer hover:px-6"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <LogOut className="rotate-180" />
                  )}
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
