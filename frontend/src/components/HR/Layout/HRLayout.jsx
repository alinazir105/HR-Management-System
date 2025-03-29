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
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
};

export default HRLayout;
