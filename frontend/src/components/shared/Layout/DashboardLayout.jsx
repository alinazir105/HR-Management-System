import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./Sidebar";
import { useSession } from "@/contexts/Session/SessionContext";
import LoadingIcon from "../../ui/LoadingIcon";
import Notifications from "../Notifications/Notifications";
import LoadingScreen from "@/components/ui/LoadingScreen";

const DashboardLayout = ({ navItems }) => {
  const { isLoading } = useSession();
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar navItems={navItems} />
        <main className="w-full">
          <div className="flex justify-between items-center sticky top-0 z-10 bg-white">
            <SidebarTrigger className="w-12 h-12 p-3 rounded-full hover:bg-gray-300 cursor-pointer transition-all"></SidebarTrigger>
            <Notifications />
          </div>

          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
