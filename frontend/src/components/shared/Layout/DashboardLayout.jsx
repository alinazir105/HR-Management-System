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
        <div className="flex min-h-screen overflow-hidden w-full">
          <DashboardSidebar navItems={navItems} />

          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center sticky top-0 z-10 bg-white">
              <SidebarTrigger className="w-12 h-12 p-3 rounded-full hover:bg-gray-300 cursor-pointer transition-all" />
              <Notifications />
            </div>

            <div className="flex-1 overflow-y-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
