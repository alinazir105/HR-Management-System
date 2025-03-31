import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./Sidebar";
import { useSession } from "@/contexts/Session/SessionContext";

const DashboardLayout = ({ navItems }) => {
  const { isLoading } = useSession();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar navItems={navItems} />
        <main>
          <SidebarTrigger className="w-12 h-12 p-3 rounded-full hover:bg-gray-300 cursor-pointer transition-all"></SidebarTrigger>
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
