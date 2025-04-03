import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "./Sidebar";
import { useSession } from "@/contexts/Session/SessionContext";
import LoadingIcon from "../../ui/LoadingIcon";
import Notifications from "../Notifications/Notifications";

const DashboardLayout = ({ navItems }) => {
  const isLoggedIn = useLocation().state?.isLoggedIn;
  const { isLoading } = useSession();
  if (isLoading) {
    return <LoadingIcon />;
  }
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar navItems={navItems} />
        <main className="w-full">
          <div className="flex justify-between items-center">
            <SidebarTrigger className="w-12 h-12 p-3 rounded-full hover:bg-gray-300 cursor-pointer transition-all"></SidebarTrigger>
            <Notifications isLoggedIn={isLoggedIn} />

          </div>

          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
