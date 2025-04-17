import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import DashboardLayout from "./components/shared/Layout/DashboardLayout";
import ProtectedRoute from "./components/shared/Layout/ProtectedRoute";
import { SessionProvider } from "./contexts/Session/SessionProvider";
import RequestReset from "./pages/RequestReset";
import VerifyReset from "./pages/VerifyReset";
import NewPassword from "./pages/NewPassword";
import HrHome from "./components/HR/Homepage/Home";
import {
  Home,
  Calendar,
  Inbox,
  ListChecks,
  Users,
  DoorOpen,
  CreditCard,
  CircleDollarSign,
  Megaphone,
  Star,
  UserPen,
  Clock,
} from "lucide-react";
import ManageEmployees from "./components/HR/ManageEmployees/ManageEmployees";
import Attendance_Leave from "./components/HR/Attendance & Leave/Attendance_Leave";

const hrNavItems = [
  { title: "Home", url: "/hr/dashboard", icon: Home },
  { title: "Employees", url: "/hr/dashboard/manage-employees", icon: Users },
  {
    title: "Attendance & Leave",
    url: "/hr/dashboard/attendance-leave",
    icon: Inbox,
  },
  { title: "Payroll Management", url: "/hr/dashboard/payroll", icon: Inbox },
  {
    title: "Performance Evaluation",
    url: "/hr/dashboard/performance",
    icon: Inbox,
  },
  {
    title: "Recruitment Portal",
    url: "/hr/dashboard/recruitment",
    icon: Inbox,
  },
];
const employeeNavItems = [
  { title: "Home", url: "/employee/dashboard", icon: Home },
  { title: "My Tasks", url: "/employee/dashboard/tasks", icon: ListChecks },
  {
    title: "My Attendance",
    url: "/employee/dashboard/attendance",
    icon: Clock,
  },
  { title: "Leave Requests", url: "/employee/dashboard/leave", icon: DoorOpen },
  {
    title: "Payroll",
    url: "/employee/dashboard/payroll",
    icon: CircleDollarSign,
  },
  {
    title: "Announcements",
    url: "/employee/dashboard/announcements",
    icon: Megaphone,
  },
  {
    title: "Performance Review",
    url: "/employee/dashboard/performance",
    icon: Star,
  },
  { title: "User Profile", url: "/employee/dashboard/profile", icon: UserPen },
];

const App = () => {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Toaster position="top-center" />
        <Routes>
          <Route index path="/login" element={<Login />} />

          <Route path="/reset-password/request" element={<RequestReset />} />
          <Route path="/reset-password/verify" element={<VerifyReset />} />
          <Route
            path="/reset-password/new-password"
            element={<NewPassword />}
          />

          <Route element={<ProtectedRoute allowedRole="hr" />}>
            <Route
              path="/hr/dashboard"
              element={<DashboardLayout navItems={hrNavItems} />}
            >
              {/* HR Routes will go here */}
              <Route index element={<HrHome />} />
              <Route
                path="/hr/dashboard/manage-employees"
                element={<ManageEmployees />}
              />
              <Route
                path="/hr/dashboard/attendance-leave"
                element={<Attendance_Leave />}
              />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRole="employee" />}>
            <Route
              path="/employee/dashboard"
              element={<DashboardLayout navItems={employeeNavItems} />}
            >
              {/* Employee Routes will go here */}
              <Route index />
              <Route path="" />
            </Route>
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
};

export default App;
