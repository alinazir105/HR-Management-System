import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const items = [
  {
    title: "Dashboard",
    icon: "",
    link: "/",
  },
  {
    title: "Attendance",
    icon: "",
    link: "/attendance",
  },
  {
    title: "Payroll",
    icon: "",
    link: "/payroll",
  },
  {
    title: "Performance",
    icon: "",
    link: "/performance",
  },
  {
    title: "Announcements",
    icon: "",
    link: "/announcements",
  },
];

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1>HR Management System</h1>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>Profile</div>
    </div>
  );
};

export default Navbar;
