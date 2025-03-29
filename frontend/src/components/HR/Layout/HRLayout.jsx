import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import HRSidebar from "./Sidebar";

const HRLayout = () => {
  return (
    <>
      <SidebarProvider>
        <HRSidebar />
        <main>
          <SidebarTrigger className="w-12 h-12 p-3 rounded-full hover:bg-gray-300 transition-all"></SidebarTrigger>
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
};

export default HRLayout;
